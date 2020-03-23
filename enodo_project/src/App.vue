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
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload</el-button>
    </el-upload>

    <el-menu :default-openeds="['1','2']" >
    <el-button style="margin-top: 5px;" type="primary" size="small" @click="handleFilter"> Filter <i class="el-icon"></i> </el-button>
    <el-button style="margin-top: 5px;" type="primary" size="small" @click="handleClear"> Clear <i class="el-icon"></i> </el-button>

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>Categorical</template>
        <el-menu-item-group>

          <el-menu-item index="1-1"> Full Address </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'Full Address')">
            <el-button type="primary" size="mini"> {{ filters['Full Address'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in full_addr" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-2"> Class Description </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'CLASS_DESCRIPTION')">
            <el-button type="primary" size="mini"> {{ filters['CLASS_DESCRIPTION'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in class_desc" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-3"> Loc </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'LOC')">
            <el-button type="primary" size="mini"> {{ filters['LOC'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in loc" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-4"> Dir </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'DIR')">
            <el-button type="primary" size="mini"> {{ filters['DIR'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in dir" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-5"> Street </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'STREET')">
            <el-button type="primary" size="mini"> {{ filters['STREET'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in street" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-6"> Suffix </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'SUFFIX')">
            <el-button type="primary" size="mini"> {{ filters['SUFFIX'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in suffix" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-7"> City </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'CITY')">
            <el-button type="primary" size="mini"> {{ filters['CITY'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in city" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-8"> Res Type </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'RES_TYPE')">
            <el-button type="primary" size="mini"> {{ filters['RES_TYPE'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in res_type" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-9"> BLDG_Use </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'BLDG_USE')">
            <el-button type="primary" size="mini"> {{ filters['BLDG_USE'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in bldg_use" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-10"> EXT_Desc </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'EXT_DESC')">
            <el-button type="primary" size="mini"> {{ filters['EXT_DESC'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in ext_desc" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-12"> BSMT_Desc </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'BSMT_DESC')">
            <el-button type="primary" size="mini"> {{ filters['BSMT_DESC'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in bsmt_desc" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-13"> ATTIC_Desc </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'ATTIC_DESC')">
            <el-button type="primary" size="mini"> {{ filters['ATTIC_DESC'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in attic_desc" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-14"> GAR_Desc </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'GAR_DESC')">
            <el-button type="primary" size="mini"> {{ filters['GAR_DESC'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in gar_desc" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-15"> Sale date </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'SALE_DATE')">
            <el-button type="primary" size="mini"> {{ filters['SALE_DATE'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in sale_date" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-16"> APPEAL_A_Status </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'APPEAL_A_STATUS')">
            <el-button type="primary" size="mini"> {{ filters['APPEAL_A_STATUS'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in appeal_a_status" :key="index" :command="m" > {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-17"> APPEAL_A_Result </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'APPEAL_A_RESULT')">
            <el-button type="primary" size="mini"> {{ filters['APPEAL_A_RESULT'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in appeal_a_result" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-18"> APPEAL_A_PIN_Result </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'APPEAL_A_PIN_RESULT')">
            <el-button type="primary" size="mini"> {{ filters['APPEAL_A_PIN_RESULT'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in appeal_a_pin_result" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item index="1-19"> APPEAL_A_Resltdate </el-menu-item>
          <el-dropdown @command="command => handleCommand(command, 'APPEAL_A_RESLTDATE')">
            <el-button type="primary" size="mini"> {{ filters['APPEAL_A_RESLTDATE'] }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(m, index) in appeal_a_resltdate" :key="index" :command="m"> {{ m }} </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Numerical</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"> Longitude </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.Longitude" :step="0.01" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.Longitude" :step="0.01" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-2"> Latitude </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.Latitude" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.Latitude" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-3"> Zip </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.Zip" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.Zip" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-4"> PIN </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PIN" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PIN" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-5"> OVACLS </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.OVACLS" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.OVACLS" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-6"> CURRENT_LAND </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.CURRENT_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.CURRENT_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-7"> CURRENT_BUILDING </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.CURRENT_BUILDING" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.CURRENT_BUILDING" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-8"> CURRENT_TOTAL </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.CURRENT_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.CURRENT_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-9"> ESTIMATED_MARKET_VALUE </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.ESTIMATED_MARKET_VALUE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.ESTIMATED_MARKET_VALUE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-10"> PRIOR_LAND </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PRIOR_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PRIOR_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-11"> PRIOR_BUILDING </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PRIOR_BUILDING" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PRIOR_BUILDING" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-12"> PRIOR_TOTAL </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PRIOR_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PRIOR_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-13"> PPRIOR_LAND </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PPRIOR_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PPRIOR_LAND" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>
    
          <el-menu-item index="2-14"> PPRIOR_BUILDING </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PPRIOR_BUILDING" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PPRIOR_BUILDING" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-15"> PPRIOR_TOTAL </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PPRIOR_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PPRIOR_TOTAL" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-16"> PPRIOR_YEAR </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.PPRIOR_YEAR" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.PPRIOR_YEAR" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-17"> TOWN </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.TOWN" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.TOWN" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-18"> VOLUME </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.VOLUME" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.VOLUME" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-19"> TAX_CODE </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.TAX_CODE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.TAX_CODE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-20"> NEIGHBORHOOD </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.NEIGHBORHOOD" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.NEIGHBORHOOD" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-21"> HOUSENO </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.HOUSENO" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.HOUSENO" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-22"> APT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-23"> APT_DESC </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APT_DESC" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APT_DESC" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-24"> COMM_UNITS </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.COMM_UNITS" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.COMM_UNITS" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-25"> FULL_BATH </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.FULL_BATH" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.FULL_BATH" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-26"> HALF_BATH </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.HALF_BATH" :step="0.01" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.HALF_BATH" :step="0.01" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-27"> AC </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.AC" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.AC" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-28"> FIREPLACE </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.FIREPLACE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.FIREPLACE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-29"> PIN </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.AGE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.AGE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-30"> BUILDING_SQ_FT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.BUILDING_SQ_FT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.BUILDING_SQ_FT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-31"> LAND_SQ_FT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.LAND_SQ_FT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.LAND_SQ_FT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-32"> BLDG_SF </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.BLDG_SF" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.BLDG_SF" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-33"> UNITS_TOT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.UNITS_TOT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.UNITS_TOT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-34"> MULTI_SALE </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.MULTI_SALE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.MULTI_SALE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-35"> DEED_TYPE </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.DEED_TYPE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.DEED_TYPE" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-36"> SALE_AMOUNT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.SALE_AMOUNT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.SALE_AMOUNT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-37"> APPCNT </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APPCNT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APPCNT" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-38"> APPEAL_A </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APPEAL_A" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APPEAL_A" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>
    
          <el-menu-item index="2-39"> APPEAL_A_REASON </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APPEAL_A_REASON" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APPEAL_A_REASON" :step="0.001" :precision="4" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-40"> APPEAL_A_PROPAV </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APPEAL_A_PROPAV" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APPEAL_A_PROPAV" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

          <el-menu-item index="2-41"> APPEAL_A_CURRAV </el-menu-item>
            <template>
              <el-input-number v-model="ranges.min.APPEAL_A_CURRAV" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
              <el-input-number v-model="ranges.max.APPEAL_A_CURRAV" :step="1" :precision="1" size="small" @change="handleChange"></el-input-number>
            </template>

        </el-menu-item-group>
        </el-submenu>


    </el-menu>

  </el-aside>
  
    <GmapMap v-bind:center="center" v-bind:zoom="14" style="height: 960px; width: 2500px">
      <gmap-marker v-bind:key="index" v-for="(m, index) in markers" v-if="m.show" v-bind:position="m.position" 
      v-bind:title="dataset.DATA['data'][index]['Full Address']" v-bind:clickable="true" v-bind:icon="genIcon(index)" >
      </gmap-marker>  
    </GmapMap>
  </el-container> 
</div>

</template>

<script>
import Papa from 'vue-papa-parse'

export default {

  data: function() {
    return {
      dataset: {},
      center: { lat: 42, lng: -88 },
      markers: [],
      minmax : {},
      uploaded: {'u': false},
      filters: {},
      ranges: { min: {}, max: {}}
    };
  },

  // Creating Sets of dropdown items 
  computed: {
    full_addr() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['Full Address']))];
      }
    },
    rec_type() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['REC_TYPE']))];
      }
    },
    class_desc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['CLASS_DESCRIPTION']))];
      }
    },
    loc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['LOC']))];
      }
    },
    dir() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['DIR']))];
      }
    },
    street() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['STREET']))];
      }
    },
    suffix() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['SUFFIX']))];
      }
    },
    city() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['CITY']))];
      }
    },
    res_type() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['RES_TYPE']))];
      }
    },
    bldg_use() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['BLDG_USE']))];
      }
    },
    ext_desc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['EXT_DESC']))];
      }
    },
    bsmt_desc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['BSMT_DESC']))];
      }
    },
    attic_desc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['ATTIC_DESC']))];
      }
    },
    gar_desc() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['GAR_DESC']))];
      }
    },
    sale_date() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['SALE_DATE']))];
      }
    },
    appeal_a_status() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['APPEAL_A_STATUS']))];
      }
    },
    appeal_a_result() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['APPEAL_A_RESULT']))];
      }
    },
    appeal_a_pin_result() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['APPEAL_A_PIN_RESULT']))];
      }
    },
    appeal_a_resltdate() {
      if (this.uploaded.u) {
        return [...new Set(this.dataset.DATA['data'].map(i => i['APPEAL_A_RESLTDATE']))];
      }
    },
  },


  methods: {
    // Not actually submitting to a server
    submitUpload(e) {
      this.onSuccess(this.$refs.upload.uploadFiles[0])
    },

    onSuccess(file) {
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
          var marker = {position: {}, show: true};
          marker.position['lat'] = parseFloat(arr[i]['Latitude']);
          marker.position['lng'] = parseFloat(arr[i]['Longitude']);
          this.$set(this.markers, i, marker);
          //update minVal, maxVal
          var mkt_val = parseInt(arr[i]['ESTIMATED_MARKET_VALUE'].replace(/,/g,""));
          mini = Math.min(mini, mkt_val);
          maxi = Math.max(maxi, mkt_val);
        }
      }
      this.$set(this.minmax, 'MIN', mini);
      this.$set(this.minmax, 'MAX', maxi);
      this.$set(this.center, 'lat', marker.position['lat']);
      this.$set(this.center, 'lng', marker.position['lng']);
      
    },

    genIcon(index) {
      const mkt_val = parseInt(this.dataset.DATA['data'][index]['ESTIMATED_MARKET_VALUE'].replace(/,/g,""));
      const g_val = Math.floor(255 * (mkt_val - this.minmax.MIN) / (this.minmax.MAX - this.minmax.MIN));
      const r_val = 255 - g_val;

      return "http://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + r_val.toString(16).padStart(2, '0') + g_val.toString(16).padStart(2, '0') + "00";
    },

    handleCommand(command, cat) {
      this.$set(this.filters, cat, command);
      // console.log(command, cat);
    },

    handleChange(value) {
      // console.log(value);
    },

    handleFilter() {
      // for each row
      for (var i = 0; i < this.dataset.DATA['data'].length; i++) {
        var row = this.dataset.DATA['data'][i];

        if (row.hasOwnProperty("Latitude") && row.hasOwnProperty("Longitude")) {
          var bool = 'true';
          // categorical filters
          for (var filter in this.filters) {
            if (this.filters.hasOwnProperty(filter)) {  
              bool = (bool && (row[filter] == this.filters[filter]));
            }
          }

          // numerical filters
          for (var minkey in this.ranges['min']) {
            // console.log(minkey, this.ranges.min[minkey]);
            if (typeof this.ranges.min[minkey] !== 'undefined') {
              bool = (bool && (parseFloat(row[minkey]) >= parseFloat(this.ranges.min[minkey])));
            }
          }
          for (var maxkey in this.ranges['max']) {
            if (typeof this.ranges.max[maxkey] !== 'undefined') {
              bool = (bool && (parseFloat(row[maxkey]) <= parseFloat(this.ranges.max[maxkey])));
            }
          }

          this.$set(this.markers[i], 'show', bool);
        }
      }
    },

    handleClear() {
      this.filters = {}; 
      this.ranges = {min: {}, max: {}};     
    }

  }
  
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
