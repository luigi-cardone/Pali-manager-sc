import db from '../config/dataBaseOptions.js'
const getUsers = (req, res) =>{
    const q = "SELECT * FROM users INNER JOIN users_data ON users_data.user_id = users.user_id"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}
export default getUsers