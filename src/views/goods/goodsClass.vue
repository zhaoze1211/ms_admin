<template>
    <div>
		<div class="float-left">
    		<r-button type="primary" @click.native='toUpdate'>刷新</r-button>
            <r-button type="primary" @click.native='addClass'>添加分类</r-button>
    	</div>
    	<div class="float-right xv-block">
    		<div class="float-left">
    			<r-input v-model="className" placeholder="分类名称" :maxlength='20'></r-input>
    			
    		</div>
			<div class="float-right mg-left">
				<r-button type="primary" icon="search" @click.native='toSearch'>搜索</r-button>
			</div>
    	</div>
    	<div class="xv-block">
    		<r-table
			    :data="tableData"
			    border
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <r-table-column
			      type="selection"
			      width="55">
			    </r-table-column>
			    <r-table-column
			      inline-template
			      label="分类名称">
			      <div>{{ row.name }}</div>
			    </r-table-column>
			    <r-table-column
			      inline-template
			      :context="_self"
			      fixed="right"
			      label="操作"
			      width="120">
			      <span>
			        <r-button 
			        	type="success" 
			        	icon="edit" 
			        	size='mini'
			        	@click.native.prevent="edit(row.id,$index)">
			        </r-button>
			        <r-button
			          @click.native.prevent="del(row.id,$index)"
			          type="primary"
			          icon="delete"
			          size="mini">
			        </r-button>
			      </span>
			    </r-table-column>
			  </r-table>
    	</div>
    	<div class="float-left">
    		<r-button @click.native='toDeleteList' :disabled='DelbtnDisabled'>批量删除</r-button>
    	</div>
    	<div class="float-right xv-block" v-if='total>0'>
    		<el-pagination 
    			@size-change="handleSizeChange"
    			@current-change="handleCurrentChange" 
    			:current-page="params.pageNumber"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total" 
                :page-size="params.pageSize">
            </el-pagination>
    	</div>
    	<el-dialog title="商品删除" v-model="delDialogVisible" size="tiny" @close='toCloseDeleteDialog'>
	      <span>删除后商品无法恢复，确认删除？</span>
	      <span slot="footer" class="dialog-footer">
	      	<r-button @click="delDialogVisible = false">取 消</r-button>
	      	<r-button type="primary" @click="toDel">确 定</r-button>
	    	</span>
	    </el-dialog>
	    <el-dialog title="分类列表" v-model="classifyDialogVisible" size="tiny" @close='toCloseD'>
	      <r-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
			<r-form-item label="分类名称" prop="name">
			  <r-input v-model="ruleForm.name"></r-input>
			</r-form-item>
			
		  </r-form>
	      <span slot="footer" class="dialog-footer">
	      	<r-button type="primary" @click="toSave">保存</r-button>
	      	<r-button @click="classifyDialogVisible = false">取 消</r-button>
	      	
	      </span>
	    </el-dialog>
	    <el-dialog title="编辑分类" v-model="editClassifyDialogVisible" size="tiny" @close='toCloseEditDialog'>
	      <r-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			
			<r-form-item label="分类名称" prop="name">
			  <r-input v-model="ruleForm2.name"></r-input>
			</r-form-item>
			
		  </r-form>
	      <span slot="footer" class="dialog-footer">
	      	<r-button type="primary" @click="toSaveEdit">保存</r-button>
	      	<r-button @click="editClassifyDialogVisible = false">取 消</r-button>
	      	
	      </span>
	    </el-dialog>
	    
    </div>

</template>
<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    import {
        formatDate,
        parseDate
    } from '../../components/date-picker/util/index';
    export default {
        data() {
            return {
            	className: '', // 商品名称
                tableData: [{
                  id:'1',
		          tag_price: '1200',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'0',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          id:'2',
		          tag_price: '2016-05-02',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'1000',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          tag_price: '2016-05-04',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'1000',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          tag_price: '2016-05-01',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'0',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }],
		        multipleSelection: [],
		        // 分页
                params: {
                    "pageSize": constants.pagination.pageSize,
                    "pageNumber": 1,
                },
                total: 15,
                delDialogVisible:false,  // 删除
                oneDelete:false,         // 单个删除
                classifyDialogVisible:false, // 添加分类
                editClassifyDialogVisible:false, // 编辑分类
                DelbtnDisabled:true,
                //删除参数
		        delParam: {
		            id: '',
		            index: ''
		        },
		        //编辑分类
		        editParam: {
		            id: '',
		            index: ''
		        },
		        delArr:[],
		        ruleForm: {
			        name: ''
			    },
			    ruleForm2: {
			        name: ''
			    },
			    rules: {
			        name: [
			        	{required: true, message: '不能为空', trigger: 'blur'},
						{
					     	validator: (rule, value, callback) => {
			                    if (/^\s*$/g.test(this.ruleForm2.name)) {
			                        callback(new Error('不能为空'));
			                    } else {
			                        callback();
			                    }
	                	 	}, trigger: 'blur'
		            	}
					],
			    },
			    rules2: {
			        name: [
			        	{required: true, message: '不能为空', trigger: 'blur'},
						{
					     	validator: (rule, value, callback) => {
			                    if (/^\s*$/g.test(this.ruleForm2.name)) {
			                        callback(new Error('不能为空'));
			                    } else {
			                        callback();
			                    }
	                	 	}, trigger: 'blur'
		            	}
					],
			    },
			    classifyArr:[{
		            name: '手机',
		            id:'1'
		        }, ]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                that.getList();
            })
        },
        methods: {
        	toUpdate(){         // 刷新
        		location.reload();
        	},
        	addClass(){
        		// 添加分类
        		this.classifyDialogVisible = true;
        	},
        	toSearch(){  		// 搜索
        		let that = this;
        		that.getList();
        	},
        	getList(msg){
        		let that = this;
        		utils.ajax({   // 分类列表查询接口
                    url: "/seller/product/category/list",
                    data: {
                        "page_size": that.params.pageSize, 
                        "page_no": that.params.pageNumber, 
                        "name":that.className
                    },
                    success: function (res) {
                        if (res.result) {
                            that.tableData = res.result.list;
                            that.total = parseInt(res.result.total_amount);
                            if(msg){
                            	that.$message({
	                                message: msg,
	                                type: 'success'
	                            });
                            }
                        }

                    }
                });
        	},
        	del(id,index){
        		this.delDialogVisible = true;
		        this.delParam.id = id;
		        this.delParam.index = index;
		        this.oneDelete = true;
		        console.log( this.delParam);
        	},
        	toDeleteList(){
        		let that = this;
        		that.delDialogVisible = true;
        		console.log('this.multipleSelectionSSS',this.multipleSelection);
        		that.delArr = [];
        		that.multipleSelection.forEach(function(item) {
		            that.delArr.push({
		            	"id":item.id
		            })
		            
		        })
        		console.log('that.delArrSSS',that.delArr);
        	},
            toDel(){
            	// 确定删除
            	let that = this;
            	console.log('删除的数据',that.delArr);
            	if(that.oneDelete){
            		that.delArr = [];
            		that.delArr.push({
	            		"id":that.delParam.id
	            	});
	            	console.log('单个删除',that.delArr)
            	};
            	utils.ajax({
                    url: "/seller/product/category/delete",    // 删除分类
                    data: that.delArr,
                    success: function (res) {
                        if (res.success) {
                            if(that.delArr.length){   // 批量删除
                            	that.getList('删除成功');
                            }else{
                            	// 单个删除的开关
                            	that.tableData.splice(that.delParam.index, 1);
	                            that.total--;
								that.delDialogVisible = false;
								that.oneDelete = false;   
                            }
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.msg
                            });
                        }

                    }
                });
            },
            toSave(){  // 添加分类并保存
            	let that = this;
            	that.$refs.ruleForm.validate((valid) => {
			        if (valid) {
			          	alert('submit!');
			          	console.log('that.ruleForm.name',that.ruleForm.name)
			          	utils.ajax({
		                    url: "/seller/product/category/add",  // 添加分类
		                    data: {
		                    	"name":that.ruleForm.name   // 分类名
		                    },
		                    success: function (res) {
		                        if (res.success) {
		                            that.classifyDialogVisible = false;
					                that.getList('保存成功');
		                        } else {
		                            that.$notify.error({
		                                title: '错误',
		                                message: res.msg
		                            });
		                        }
		
		                    }
		                });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			    });
            },
            edit(id,index){
            	// 编辑分类
            	this.editClassifyDialogVisible = true;
		        this.editParam.id = id;
		        this.editParam.index = index;
		        console.log('this.editParam',this.editParam);
            },
            toSaveEdit(){  // 编辑分类并保存
            	let that = this;
            	that.$refs.ruleForm2.validate((valid) => {
			        if (valid) {
			          	alert('submit!');
			          	console.log('that.ruleForm2.name',that.ruleForm2.name)
			          	utils.ajax({
		                    url: "/seller/product/category/update",  // 编辑分类
		                    data: {
		                    	"id":that.editParam.id,
		                    	"name":that.ruleForm2.name   // 分类名
		                    },
		                    success: function (res) {
		                        if (res.success) {
		                            that.editClassifyDialogVisible = false;
					                that.getList('保存成功');
		                        } else {
		                            that.$notify.error({
		                                title: '错误',
		                                message: res.msg
		                            });
		                        }
		
		                    }
		                });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			    });
            },
        	handleSelectionChange(val) {
        		this.DelbtnDisabled = false;
		        this.multipleSelection = val;
		        console.log('val',val);
		        console.log('this.multipleSelection',this.multipleSelection);
		    },
		    // 分页
            handleCurrentChange(val) {
                this.params.pageNumber = val;
                this.getList();
            },
            handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.params.pageSize = val;
                this.getList();
		    },
		    handleReset(id) {
		      this.$refs[id].resetFields();
		    },
		    toCloseD(){
		    	// 添加分类对话框关闭时
		    	this.handleReset('ruleForm');
		    	this.multipleSelection = [];
		    },
		    toCloseDeleteDialog(){
		    	this.oneDelete = false;   // 重置单个删除的开关
		    },
		    toCloseEditDialog(){
		    	// 编辑分类对话框关闭时
		    	this.handleReset('ruleForm2');
		    }
        },
        computed: {
            
        },
        components: {
            "rButton": require('../../components/button/button.vue'),
            "rTable": require('../../components/table/table.vue'),
            "rTableColumn": require('../../components/table/table-column.vue'),
            "elPagination": require('../../components/pagination/pagination.vue'),
            "elDialog": require('../../components/dialog/dialog.vue'),
            // 表单
	        "rForm": require('../../components/form/form.vue'),
	        "rFormItem": require('../../components/form/form-item.vue'),
	        "rInput": require('../../components/input/input.vue'),
	        "rSelect": require('../../components/select/select.vue'),
	        "rOption": require('../../components/option/option.vue'),

        }
    }
</script>
<style lang="less" scoped>
    /*@import "../../assets/styles/views/myOrder.less";*/

    
</style>