import axiosInstance from "./axios";

class SaleApi{
    async getAllSales(params ={}){
        const response = await axiosInstance.get('/sales',{params})
        return response.data
    }
    async createSale(saleData){
        const response = await axiosInstance.post('/sales',saleData)
        return response.data
    }
    async getTodaySales(){
        const response = await axiosInstance.get('/sales/today')
        console.log(response)
        return response.data
    }
    async getMySales(){
        const response = await axiosInstance.get('/sales/my-sale')
        return response.data
    }
}
export default new SaleApi()