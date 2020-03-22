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
          <el-menu-item index="1-1">REC_TYPE</el-menu-item>
          <el-menu-item index="1-2">CLASS_DESCRIPTION</el-menu-item>
          <el-menu-item index="1-3">LOC</el-menu-item>
          <el-menu-item index="1-4">DIR</el-menu-item>
          <el-menu-item index="1-5">STREET</el-menu-item>
          <el-menu-item index="1-6">SUFFIX</el-menu-item>
          <el-menu-item index="1-3">Option 3</el-menu-item>
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
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
    <GmapMap v-bind:center="center" v-bind:zoom="14" style="height: 720px; width: 2500px">
      <gmap-marker v-bind:key="index" v-for="(m, index) in markers" v-bind:position="m.position" v-bind:title="dataset.DATA['data'][index]['Full Address']" v-bind:clickable="true">
      </gmap-marker>  
    </GmapMap>
  </el-container> 
  <h1> Test </h1>
  <div> {{ center }} </div>
</div>

</template>

<script>
import Papa from 'vue-papa-parse'

export default {

  data: function() {
    return {
      dataset: {},
      center: { lat: 41.87, lng: -87.66 },
      markers: []
    };
  },

  methods: {
    submitUpload(e) {
      this.$refs.upload.submit();
    },

    onSuccess(response, file, fileList) {
      var reader = new FileReader();
      reader.onload = event => {
        const text = reader.result;
        const data = this.$papa.parse(text, {header:true});
        this.$set(this.dataset, 'DATA', data);
        this.createMarkers();
      }
      reader.readAsText(file.raw);
    },

    createMarkers() {
      const arr = this.dataset.DATA['data'];
      for (var i=0; i<arr.length; i++) {
        var marker = {position: {}};
        marker.position['lat'] = parseFloat(arr[i]['Latitude']);
        marker.position['lng'] = parseFloat(arr[i]['Longitude']);
        this.$set(this.markers, i, marker);
      }
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
