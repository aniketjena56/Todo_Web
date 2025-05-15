import Todo from "../models/todo.js";

export async function createTodo(req, res){
    const utext=req.body.text
    const ucompleted=req.body.completed

    try {
        const utodo= new Todo({
           "text":utext,
           "completed": ucompleted
        })

        const newTodo=await utodo.save()
        res.status(201).json({"todo":newTodo})
        
    } catch (error) {
        res.status(402).json({"msg":error})
        
    }    
}

export async function updateTodo(req, res) {
    const utext = req.body.text;
    const ucompleted = req.body.completed;

    try {
        const getTodo = await Todo.findById(req.params.id);
        if (!getTodo) {
            return res.status(404).json({ "message": "No todo found with that ID" }); // better to return here
        }

        if (utext != null) {
            getTodo.text = utext;
        }
        if (ucompleted != null) {
            getTodo.completed = ucompleted;
        }

        const updated = await getTodo.save();
        return res.status(200).json({ "todo": updated }); // send only once
    } catch (error) {
        return res.status(500).json({ "msg": error.message });
    }
}


export async function fetchTodo(req, res) {
    try {
        const todos = await Todo.find()
    res.json(todos)
    } catch (error) {
        res.status(402).json(error)
    }
    
    
}
export async function deleteTodo(req, res)
{
    try {
        const getId= await Todo.findByIdAndDelete(req.params.id) // here i wrote findbyid
        if(!getId){
           return res.status(400).json({"message" : "not found"})

        }
        else{
            //  await getId.remove() // why its not working
            //  think why cant i store the data in a variable and send it in response
        }
        res.json({"message" :"Todo deleted"})
        
    } catch (error) {
        res.status(404).json(error)
    }
}
    
