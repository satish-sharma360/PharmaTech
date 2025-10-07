import express from 'express'
import cors from 'cors'
import environment from './config/environment.js'
import authRouter from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'
import medicineRouter from './routes/medicine.routes.js'
import inventoryRouter from './routes/inventory.routes.js'
import reportRouter from './routes/report.routes.js'
import saleRouter from './routes/sale.routes.js'
import prescriptionRouter from './routes/prescription.routes.js'
import patientRouter from './routes/patient.routes.js'
import dbConnect from './utils/dbConnect.js'


class PharmacyServer {
    constructor() {
        this.app = express()
        this.port = environment.PORT
        this.initializeMiddlewares()
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use(cors({
            origin: '*',
            credentials: true
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }
    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.status(200).json({
                success: true,
                message: 'Pharmacy Management System API is running'
            });
        })

        // Api Routes

        this.app.use('/api/auth', authRouter)
        this.app.use('/api/users', userRoute)
        this.app.use('/api/medicines', medicineRouter)
        this.app.use('/api/patients', patientRouter)
        this.app.use('/api/prescriptions', prescriptionRouter)
        this.app.use('/api/sales', saleRouter)
        this.app.use('/api/inventory', inventoryRouter)
        this.app.use('/api/reports', reportRouter)

        // 404 handler
        // this.app.use('/*', (req, res) => {
        //     res.status(404).json({
        //         success: false,
        //         message: 'Route not found'
        //     });
        // })
    }
    async start() {
        try {
            await dbConnect.connect()
            this.app.listen(this.port, () => {
                console.log('===========================================');
                console.log('🏥 Pharmacy Management System API');
                console.log('===========================================');
                console.log(`🚀 Server running on port ${this.port}`);
                console.log(`📡 API URL: http://localhost:${this.port}`);
                console.log('===========================================')
            })
        } catch (error) {
            console.error('❌ Failed to start server:', error.message);
            process.exit(1);
        }
    }
}
const server =  new PharmacyServer();
server.start()