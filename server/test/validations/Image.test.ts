import Image from './../../models/Image'
import supertest from 'supertest'
import app from './../../app'
import path from 'path'
import fs from 'fs'

const request = supertest(app)

let image : string;
let id : string
let filePath : any;

describe('Image validation test', () => {
    beforeAll(async (done) => {
        await Image.deleteMany()
        const exists =  fs.existsSync(path.join(__dirname, '..', '/mock/mock.png'))
        if(!exists){
            throw new Error('File does not exist')
        }
        done()
    })
        afterAll(async (done) => {
        fs.unlinkSync(filePath)
        done()
    })


    describe("Test post image route", () => {
        it('Should post an image', async () => {
            const res = await request.post('/api/v1/images')
            .attach('image', path.join(__dirname, '..', '/mock/mock.png'))
            expect(res.status).toBe(201)
            image = res.body.data.image
            id = res.body.data._id
            filePath = path.join(__dirname ,'..','../images/') + image
        })
    })

    describe("Test get image route", () => {

        it("Should get all the image from the database", async (done) => {
            const res = await request.get('/api/v1/images')
            expect(res.status).toBe(200)
            done()
        })

        it("Should respond with 200 after fetching an image", async (done) => {
            const res = await request.get('/api/v1/images/'+id)
            expect(res.status).toBe(200)
            done()
        })  

        it("Should throw an error for invalid image id", async(done) => {
            const res = await request.get('/api/v1/images/1')
            expect(res.status).toBe(500)
            done()
        })

        it("Should respond with 404 for a non-existing image id", async(done) => {
            const res = await request.post('/api/v1/images/123456789012')
            expect(res.status).toBe(404)
            done()
        })
    })

    describe("Test update image route", () => {

        it("Should respond with 200 after updating an image", async (done) => {
            const res = await request.patch('/api/v1/images/'+id)
            .attach('image', path.join(__dirname, '..', '/mock/mock2.png'))
            expect(res.status).toBe(200)
            done()
            
        })

        it("Should respond with 500 server error", async (done) => {
            const res = await request.patch('/api/v1/images/1')
            .attach('image', path.join(__dirname, '..', '/mock/mock2.png'))
            expect(res.status).toBe(500)
            done()
        })  

       it("Should respond with 404 for a non-existing image", async (done) => {
           const res = await request.patch('/api/v1/images/123456789012')
           .attach('image', path.join(__dirname, '..', '/mock/mock2.png'))
           expect(res.status).toBe(404)
           done()
        })
    })

    describe("Test delete image route", () => {

        it("Should respond with 204 after deleting an image", async (done) => {
            const res = await request.delete('/api/v1/images/'+id)
            expect(res.status).toBe(204)
            done()
        })

        it("Should respond with 500 server error", async (done) => {
            const res = await request.delete('/api/v1/images/1')
            expect(res.status).toBe(500)
            done()
        })  

       it("Should respond with 404 for a non-existing image", async (done) => {
           const res = await request.delete('/api/v1/images/123456789012')
           expect(res.status).toBe(404)
           done()
        })
    })

})

