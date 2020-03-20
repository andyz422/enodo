<template>  
<div id="app">
  <el-container style="border: 1px solid #eee">
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
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
          <template slot="title">Group 1</template>
          <el-menu-item index="2-1">Option 1</el-menu-item>
          <el-menu-item index="2-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
    <GmapMap v-bind:center="center" v-bind:zoom="14" style="height: 720px; width: 2500px">
      <gmap-marker v-bind:key="index" v-for="(m, index) in markers" v-bind:position="m.position" v-bind:clickable="true"></gmap-marker>  
    </GmapMap>
  </el-container> 
  <h1> Test </h1>
  <div> {{dataset}} </div>
</div>

</template>

<script>
import XLSX from 'xlsx'
export default {


  data: function() {
    return {
      dataset: this.readData(),
      center: { lat: 41.87, lng: -87.66 },
      markers: [
        {
          position: { lat: 41.8857718, lng: -87.6656354999999 }
        },
        {
          position: { lat: 41.8690534, lng: -87.6654184 }
        }
      ]
    };
  },

  methods: {
    readData: function() {
      var workbook = XLSX.read("../../Enodo_Fullstack_Skills_Assessment[6568]/Enodo_Skills_Assessment_Data_File.xlsx", {type: "string"});
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var outdata = XLSX.utils.sheet_to_json(worksheet, {header:1});
      return outdata;
      // var arr = [];
      // outdata.map(v => {
      //   var obj = {};
      //   obj.latitude = v['Latitude'];
      //   obj.longitude = v['Longitude'];
      // });
      // return arr;
      // this.$set(this.dataset, 'dataset', obj);
    }
  },
  // created() {
  //   this.readData();
  // }
  
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
