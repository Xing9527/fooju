<template>
  <div>
      <label  v-for="item in currentOptions">
          <input type="checkbox" name="address" style="display:none" :value="item" v-model="currentValue">
          <span class="iconfont icon-duihao3"></span>
          {{item.title}}
      </label>
  </div>
</template>

<script>
    export default {
        name: "my-checkbox",
        props:{
            options:{
                type:Array
            },
            value:{
                type:Array
            }
        },
        data() {
            return {
                currentOptions: this.options,
                currentValue: this.value
            }
        },
        watch:{
            options(val) {
                this.currentOptions = val;
            },
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit("input",val)
            }
        }
    }
</script>

<style scoped>
     label {
         display: inline-block;
        margin:0  25px 20px 0;
        cursor: pointer;
    }
     label span {
        margin-right: 5px;
        color: #fff;
        font-size: 17px;
        border: 1px solid #999;
        border-radius: 4px;
        box-sizing: border-box;
    }
     input:checked + span {
        border: 1px solid #fff;
        color: #c30d23;
    }
</style>