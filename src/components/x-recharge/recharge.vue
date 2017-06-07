<template>
	<div>
		<div class="xv-block">{{title}}
			<span>¥{{value|formatPrice}}</span>
			<span v-if='title2'>, 兑换码：{{value2}}张</span>
		</div>
		<div class="xv-block10" style="width: 200px;">
			<div v-if='select'>
				<el-select v-model="selValue" placeholder="请选择" @change='change(value,value2)'>
				    <el-option
				      v-for="item in options"
				      :label="item.label"
				      :value="item.selValue"
				    >
				    </el-option>
				</el-select>
			</div>
		</div>
	  	<div class="xv-block10">{{desc}}</div>
	  	<div class="xv-block10">
	  		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
	            <el-form-item prop="recharge">
	                <el-input 
	                	v-model="ruleForm.recharge" 
	                	:maxlength="maxlength" 
	                	:minlength='minlength'
	                	:placeholder="placeholder">
	                </el-input>
	            </el-form-item>
           </el-form>
	  	</div>
	  	<div class="xv-block"  v-if='selValue=="1"'>
			<el-row :gutter="10" class='recharge'>
			  <el-col :span="6" v-for='(item,index) in rechargeList'>
			  	<div class="pd10 text-center xv-dot-gray pointer" @click='btnType(index)' :class="{'xv-dot-xv clr-white':item == ruleForm.recharge}">{{item}}</div>
			  </el-col>
			</el-row>
	  	</div>
	  	<div class="pd-top10">
	  		<el-button :type='type' @click='btnClic'>{{btnText}}</el-button>
	  		<span v-if='select'>
	  			<el-button :disabled="true" v-if="selValue && value==0 && value2==0">
	  			下一步
	  		</el-button>
	  			<el-button :type='type'  v-if="value!=0 || value2!=0" @click='nextBtn'>下一步</el-button>
	  		</span>
	  		
	  	</div>
	</div>
</template>

<script>
  export default {
  	props: {
      rechargeList: Array,
      title: String,
      title2:Boolean,
      select:Boolean,
      value: Number,
      value2: Number,
      desc: String,
      btnText: String,
      maxlength: Number,
      minlength: Number,
      placeholder: String,
      clear:String,
      min: {
        type: Number,
        default: 0
      },
      type:{
      	type:String,
      	default:'success'
      }
    },
    data() {
      return {
      	options: [{
	          selValue: '1',
	          label: '现金'
	        }, {
	          selValue: '2',
	          label: '兑换码'
	    }],
	    selValue: '1',
	    cvalue:'',
	    cvalue2:'',
      	ruleForm: {
          recharge: '',
        },
        rules: {
          recharge: [
	    	{required: true, message: '不能为空', trigger: 'blur'},
	        {
		        validator: (rule, value,callback) => {
	                if (value.indexOf(" ") > -1) {
	                    callback(new Error('不能包含空格'));
	                } else if (/^(0|0.0|0.00)$/.test(value)&&this.selValue!=2) {
	                	callback(new Error('金额不能为0'));
	            	}else if (!/^\d+$/.test(value)&&this.selValue!=2) {
	                    callback(new Error('必须为整数'));
	                }else if(value < this.min&&this.selValue!=2){
	                	callback(new Error('金额至少'+ this.min +''));
	                }
	            	else {
	                    callback();
	            	}
            	}, trigger: 'blur'
		    }
		  ],
        }
      }
    }, 
    watch: {
      clear(){
    		this.$refs["ruleForm"].resetFields();
    	}
    },
    mounted: function() {
        this.$nextTick(function() {
        	this.change();
        })
     },
    methods: {
    	change(){  // 模态框切换
    		this.$emit('change2',{
    			selValue:this.selValue,
    			cvalue:this.value,
    			cvalue2:this.value2
    		});
      		this.$refs["ruleForm"].resetFields();
      	},
    	btnType(obj) {
        	this.$refs["ruleForm"].resetFields();
        	this.ruleForm.recharge = this.rechargeList[obj];
        },
        btnClic(){
        	if(this.selValue==2){
        		this.$refs.ruleForm.validate((field) => {
	                if (field) {
	                    this.$emit('handle',{
	                    	emitValue:this.ruleForm.recharge,
	                    	emitValue2:this.selValue
	                    });
	                }
            	});
        	}else{
        		this.$refs.ruleForm.validate((field) => {
	                if (field) {
	                    this.$emit('handle',this.ruleForm.recharge);
	                }
            	});
        	}
        },
        nextBtn(){
        	this.$refs["ruleForm"].resetFields();
        	this.$emit('nextHandle');
        }
    },
    components: {
      "elRow": require('../../components/row/row.vue'),
      "elCol": require('../../components/col/col.vue'),
      "elInput": require('../../components/input/input.vue'),
        
      "elButton": require('../../components/button/button.vue'),
      
      "elForm": require('../../components/form/form.vue'),
      "elFormItem": require('../../components/form/form-item.vue'),
      "elInput": require('../../components/input/input.vue'),
      
      "elSelect": require('../../components/select/select.vue'),
      "elOption": require('../../components/option/option.vue'),
    }
  };
</script>