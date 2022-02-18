import Server from '../app.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('Test API', () => {
    describe('Test ping API', () => {
        it(`It should have status 200, be an object and contains the property 'success' as a boolean`, (done) => {
            chai.request(Server)
            .get('/api/ping')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.success.should.be.a('boolean')            
                res.body.success.should.be.eq(true)            
                done()
            })
        })
    })

    describe('Test a success GET Posts', () => {
        it(`It should have status 200, be an object and contains the property 'posts' as an array`, (done) => {
            chai.request(Server)
            .get('/api/posts?tags=history,tech')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.posts.should.be.a('array')            
                done()
            })
        })
    })
        
    describe('Test error tag GET Posts', () => {
        it(`It should have status 400, body is a JSON with an error in string format`, (done) => {
            chai.request(Server)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.error.should.be.a('string')            
                done()
            })
        })
    })

    describe('Test invalid sortBy GET Posts', () => {
        it(`It should have status 400, body is a JSON with an error in string format`, (done) => {
            chai.request(Server)
            .get('/api/posts?tags=history,tech&sortBy=test')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.error.should.be.a('string')            
                done()
            })
        })
    })

    describe('Test invalid direction GET Posts', () => {
        it(`It should have status 400, body is a JSON with an error in string format`, (done) => {
            chai.request(Server)
            .get('/api/posts?tags=history,tech&direction=test')
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.error.should.be.a('string')            
                done()
            })
        })
    })

})