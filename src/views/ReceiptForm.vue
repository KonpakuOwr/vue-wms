<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="收货单ID" prop="receiptNoteName">
        <span>{{form.receiptId}}</span>
      </el-form-item>
<!--      供应商选择-->
      <el-form-item label="供应商" prop="supplierId">
        <el-select v-if="method !== 'check'" v-model="form.supplierId" placeholder="请选择供应商">
          <el-option v-for="item in supplierList" :key="item.supplierId"
                     :label="item.supplierName"
                     :value="item.supplierId">
          </el-option>
        </el-select>
        <span v-else>{{form.supplierId}}</span>
      </el-form-item>
<!--      仓库选择-->
      <el-form-item label="仓库" prop="warehouseId">
        <el-select v-if="method !== 'check'" v-model="form.warehouseId" placeholder="请选择仓库">
          <el-option v-for="item in warehouseList" :key="item.warehouseId"
                     :label="item.warehouseName"
                     :value="item.warehouseId">
          </el-option>
        </el-select>
        <span v-else>{{form.warehouseId}}</span>
      </el-form-item>
<!--      创建日期-->
      <el-form-item label="创建日期" prop="receiptTime">
        <el-col  v-if="method !== 'check'" :span="12">
          <el-date-picker  type="date" placeholder="选择日期"
                           v-model="form.receiptTime"
                           style="width: 100%;">
          </el-date-picker>
        </el-col>
        <span v-else>{{form.receiptTime}}</span>
      </el-form-item>
<!--      收货子表数据-->
      <receipt-stock :receipt-note-id="form.receiptId"></receipt-stock>
<!--      按钮-->
      <el-form-item v-if="method !== 'check'">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
      <el-form-item v-if="method === 'check'">
        <el-button type="primary" @click="method = 'edit'">编辑</el-button>
        <el-button @click="$router.back()">后退</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import ReceiptStock from "./ReceiptStock";

export default {
  name: "ReceiptForm",
  components:{
    ReceiptStock
  },
  data() {
    return {
      form: {
        receiptId: '',
        supplierId: '',
        warehouseId: '',
        userId: 15,
        receiptTime: '',
        receiptState: 0
      },
      supplierList:[],
      warehouseList:[],
      rules: {
        supplierId:[
          { required: true, message: '请选择供货商', trigger: 'change' }
        ],
        warehouseId:[
          { required: true, message: '请选择仓库', trigger: 'change' }
        ],
        receiptTime:[
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      method: ''
    }
  },
  methods: {
    // 点击提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        // valid校验成功返回true, 否则为false
        if (valid) {
          if (this.method === 'add') {
            axios.post('/receipt_notes', this.form).then(
                (response) => {
                  // 收货子表数据增加
                  let receiptId = response.data.data.receiptId;
                  this.$store.commit('addReceiptId', receiptId);
                  let stockList = this.$store.state.receipt.receiptStockPageData.records;
                  axios.post('/receipt_stock_notes', stockList).then(
                      (response) => {
                        console.log(response);
                      },
                      (error) => {
                        console.log(error);
                      }
                  )
                },
                error => {
                  console.log(error);
                }
            );
            // 提交后返回表格页面
            this.$router.back();
          }else if(this.method === 'edit'){
            axios.put('/receipt_notes', this.form).then(
                (response) => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                }
            )
            // 提交后返回查看状态
            this.method = 'check';
          }
        }
      })
    },
    onCancel(){
      if(this.method === 'add'){
        this.$router.back();
      }else if(this.method === 'edit'){
        // 如果是编辑取消, 返回到查看状态
        this.method = 'check';
      }
    },
    getAllSupplier(){
      axios.get("/suppliers").then(
          (response)=>{
            // console.log(response.data.data);
            this.supplierList = response.data.data;
          },
          (error)=>{
            console.log(error)
          }
      )
    },
    getAllWarehouse(){
      axios.get("/warehouses").then(
          (response)=>{
            // console.log(response.data.data);
            this.warehouseList = response.data.data;
          },
          (error)=>{
            console.log(error)
          }
      )
    },
  },
  mounted(){
    // 初始化数据
    this.method = this.$route.params.method;
    // 加载选择数据
    this.getAllSupplier();
    this.getAllWarehouse();
    // 如果是查看, 则渲染数据
    if(this.method === 'check'){
      let data = this.$route.params.data;
      this.form = JSON.parse(JSON.stringify(data));
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 20%;
}
.el-select{
  width: 20%;
}
</style>
