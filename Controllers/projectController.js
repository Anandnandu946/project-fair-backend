
const projects = require('../Models/projectSchema')

//add project logic
exports.addProject = async (req, res) => {
    console.log("Inside the addProject method");
    const { title, language, github, livelink, overview } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, language, github, livelink, overview, projectImage);
    console.log(userId);
    try {
        //check if the githunlink is already registered
        const existingProject = await projects.findOne({ github })
        console.log(existingProject);
        if (existingProject) {
            res.status(406).json("project already added")
        } else {
            const newProject = new projects({ title, language, github, livelink, overview, projectImage, userId })
            await newProject.save()
            res.status(200).json("Add Project added Successfull")
        }
    }
    catch (err) {
        res.status(500).json({ message: "project adding failed", error: err.message })
    }

}

//1.Get a perticular project details
exports.getAProject = async(req,res) => {
    console.log("inside the getproject");
    //get userid
    const userId = req.payload
    console.log(userId);
    try {
        const findoneProject = await projects.find({ userId })

        if(findoneProject) {
            res.status(200).json(findoneProject)
        } else {
            res.status(401).json("can't find the project")
        }
    } catch (err) {
        res.status(401).json({ message: "project viewing failed", error: err.message })
    }
}

//2.get 3 projects details for home project

exports.gethomeProjects = async(req,res) =>{
    try{
        const HomeProjects = await projects.find().limit(3)
        if(HomeProjects){
            res.status(200).json(HomeProjects)
        }else{
            res.status(401).json("can't find projects")
        }
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

//3.get all projects details

exports.getAllProjects = async(req,res) =>{

    const searchKey = req.query.search //search=${searchKey}-this is the query parameter from front end
    console.log(searchKey);

    let query = {}
    //case sensitive & searching project
    if(searchKey){
        query.title = {$regex:searchKey,$options:"i"}
    } //$regex:,$options:"i" - its a prebuild code
        //we can use language,github,livelink instead of title
    
    try{
        const allProjects = await projects.find(query)
        if(allProjects){
            res.status(200).json(allProjects)
        }else{
            res.status(401).json("can't find projects")
        }
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

//4.delete user project
exports.deleteUserProject = async(req,res) =>{
    const {pid} = req.params //get project id
    try{
        const deleteUserProject = await projects.findOneAndDelete({_id:pid}) //find and delete the perticular projects and returns other projects
        res.status(200).json(deleteUserProject) 
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

//5.update user project
exports.updateUserProject = async(req,res)=>{
    const { title, language, github, livelink, overview,projectImage } = req.body
    userId = req.payload
    const {pid} = req.params
    const uploadImage = req.file?req.file.filename:projectImage
    try{
        //Find perticular project,update the data and save the changes
        const updateProject =await projects.findByIdAndUpdate({_id:pid},{title, language, github, livelink, overview,projectImage:uploadImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}




