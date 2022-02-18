import axios from 'axios'

const apiURL = 'https://api.hatchways.io/assessment/blog/posts'

export default {
    /*
        Function to fetch and filter posts by specified tag(s)
        @params
        Required String tags. Any comma separated list of strings
        Optional String sortBy. Accepted values: OneOf -> id, reads, likes or popularity
        Optional String direction. Accepted values: OneOf ->  asc or desc
    */
    list: async (req, res) => {
        let { tags, sortBy, direction } = req.query

        //check for mandatory and optionals params
        if (!tags) {
            res.status(400).json({
                error: "Tags parameter is required"
            })

            return
        }

        if(sortBy && !['id', 'reads', 'likes', 'popularity'].includes(sortBy.toLowerCase())) {
            res.status(400).json({
                error: "SortBy value can only id, reads, likes or popularity"
            })

            return
        }

        if(direction && !['asc', 'desc'].includes(direction.toLowerCase())) {
            res.status(400).json({
                error: "Direction value can only be asc or desc"
            })

            return
        }

        //split the tags list
        tags = tags.split(',')


        try {
            const requests = tags.map(async t => {
                return axios.get(`${apiURL}?tag=${t}`)
            })
            
            //wait until all request are completed
            let responses = await Promise.all(requests)

            const foundPosts = []
            const posts = []
            
            responses.map(r => {
                r.data?.posts.map(p => {
                    if (!foundPosts.includes(p.id)) {
                        posts.push(p)
                        foundPosts.push(p.id)
                    }
                })
            })

            res.status(200).json({
                posts: (direction && direction == 'desc') ? posts.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1).reverse() : posts.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
            })
            
        } catch (error) {
            console.log('ERROR: ', error)
        }

        

    }
}