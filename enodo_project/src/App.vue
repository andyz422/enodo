<template>  
<div id="app">
  <el-container style="border: 1px solid #eee">
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">

    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :multiple="false"
      :limit="1"
      :auto-upload="false"
      :on-success="onSuccess">
      <el-button slot="trigger" size="small" type="primary">select file</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>
    </el-upload>

    <el-menu :default-openeds="[]">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>Categorical</template>
        <el-menu-item-group>

          <el-dropdown>
            <el-button type="primary" size="mini">
              Full Address<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in markers" > {{ dataset.DATA['data'][index]['CLASS_DESCRIPTION'] }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Numerical</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">LATITUDE</el-menu-item>
            <template>
              <el-input-number v-model="num" step=0.001 size="small" @change="handleChange" :min="0" :max="300"></el-input-number>
              <el-input-number v-model="num" step=0.001 size="small" @change="handleChange" :min="0" :max="300"></el-input-number>
            </template>

          <el-menu-item index="2-2">LONGITUDE</el-menu-item>
            <template>
              <el-input-number v-model="num" step=0.001 size="small" @change="handleChange" :min="0" :max="300"></el-input-number>
              <el-input-number v-model="num" step=0.001 size="small" @change="handleChange" :min="0" :max="300"></el-input-number>
            </template>

        </el-menu-item-group>
        </el-submenu>
      </el-submenu>
    </el-menu>

  </el-aside>
  
    <GmapMap v-bind:center="center" v-bind:zoom="14" style="height: 720px; width: 2500px">
      <gmap-marker v-bind:key="index" v-for="(m, index) in markers" v-bind:position="m.position" 
      v-bind:title="dataset.DATA['data'][index]['Full Address']" v-bind:clickable="true" v-bind:icon="genIcon(index)" >
      </gmap-marker>  
    </GmapMap>
  </el-container> 
  <h1> Test </h1>
  <div> {{ minmax }} </div>
</div>

</template>

<script>
import Papa from 'vue-papa-parse'
import mockserver from 'mockserver-node'

export default {

  data: function() {
    return {
      dataset: {},
      center: { lat: 42, lng: -88 },
      markers: [],
      minmax : {},
      uploaded: {'u': false},
      class_description: new Set()
    };
  },


  // created() {
  //   mockserver.start_mockserver({serverPort: 8080});
  // },

  methods: {
    submitUpload(e) {
      console.log(this.$refs.upload);
      this.$refs.upload.submit();
    },

    onSuccess(response, file, fileList) {
      var reader = new FileReader();
      reader.onload = event => {
        const text = reader.result;
        const data = this.$papa.parse(text, {header:true});
        this.$set(this.dataset, 'DATA', data);
        this.$set(this.uploaded, 'u', true);
        this.createMarkers();
      }
      reader.readAsText(file.raw);
    },

    createMarkers() {
      var mini = Infinity;
      var maxi = 0;
      const arr = this.dataset.DATA['data'];
      for (var i=0; i<arr.length; i++) {
        if (arr[i]['Latitude'] && arr[i]['Longitude'] && arr[i]['ESTIMATED_MARKET_VALUE']) {
          var marker = {position: {}};
          marker.position['lat'] = parseFloat(arr[i]['Latitude']);
          marker.position['lng'] = parseFloat(arr[i]['Longitude']);
          this.$set(this.markers, i, marker);
          //update minVal, maxVal
          var mkt_val = parseInt(arr[i]['ESTIMATED_MARKET_VALUE'].replace(/,/g,""));
          mini = Math.min(mini, mkt_val);
          maxi = Math.max(maxi, mkt_val);
        }
        this.$set(this.minmax, 'MIN', mini);
        this.$set(this.minmax, 'MAX', maxi);
        this.$set(this.center, 'lat', marker.position['lat']);
        this.$set(this.center, 'lng', marker.position['lng']);
        // class_description.add(arr[i]['CLASS_DESCRIPTION'])
      }

    },

    genIcon(index) {
      const mkt_val = parseInt(this.dataset.DATA['data'][index]['ESTIMATED_MARKET_VALUE'].replace(/,/g,""));
      const g_val = Math.floor(255 * (mkt_val - this.minmax.MIN) / (this.minmax.MAX - this.minmax.MIN));
      const r_val = 255 - g_val;

      return "http://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + r_val.toString(16).padStart(2, '0') + g_val.toString(16).padStart(2, '0') + "00";
    },

    handleChange(value) {
      console.log(value);
    },

  },
  
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
