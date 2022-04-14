let fs = require("fs") ;
let path = require("path") ;
function organizeFn(dirPath){
    //console.log("Organize command implemented for ", dirPath) ;
    //1 . input -> directory path given
    //2 . create -> organized files -> directory
    //3 . identify categories of all the files present in that input directory ->
    //4 . copy/cut files to that organized directory inside any of category folder
    if(dirPath==undefined){
        destPath = fs.cwd() ;
        return ;
    }else if(!fs.existsSync(dirPath)){
        console.log("directory doesnot exist , please put the correct directory name") ;
        return ;
    }else{
        let destPath = path.join(dirPath , "organized_files");
        //2 . create -> organized files -> directory
        if(!fs.existsSync(destPath)){
        fs.mkdir(destPath, (err) => {
            if(!err) { 
              //console.log("done") ;
          }else {
              //console.log(err) ;
          }});
        }
        organize_helper(destPath , dirPath) ;
    }
}
function organize_helper(destPath, dirPath){
    //3 . identify categories of all the files present in that input directory ->
    let child_names = fs.readdirSync(dirPath) ;
    for(var i =0 ; i<child_names.length ; i++)
    {
        let childAddress = path.join(dirPath , child_names[i]);
        //console.log(childAddress) ;
        let isFile = fs.lstatSync(childAddress).isFile() ;
        if(isFile){
            let category = getCategory(child_names[i]) ;
            let inside_folder = path.join(destPath , category) ;
            if(!fs.existsSync(inside_folder)){
                fs.mkdir(inside_folder, (err) => {
                    if(!err) { 
                  }else {
                      console.log(err) ;
                  }});
                }
            sendFiles(childAddress , category , destPath) ;
        }
    }
}
function sendFiles(childAddress , category , destPath){
    //console.log(`from ${childAddress} to ${dirPath} in category ${category}`) ;
    let category_path = path.join(destPath , category);
    //console.log(category_path) ;
    if(fs.existsSync(category_path)==false){
        fs.mkdir(category_path, (err) => {
            if(!err) { 
          }else {
              console.log(err) ;
          }});
    }
    let fileName = path.basename(childAddress) ;
    //console.log(fileName) ;
    let destFilePath = path.join(category_path , fileName) ;
    //console.log(destFilePath) ;
    fs.copyFileSync(childAddress , destFilePath) ;
    console.log(fileName , "coppied to " , category) ;
    fs.unlinkSync(childAddress) ;
}
function getCategory(name){
    let ext = path.extname(name) ;
    ext = ext.slice(1) ;
    for(var type in utility){
        let curr = utility[type] ;
        for(var i =0 ; i<curr.length ; i++){
            if(ext==curr[i])return type ;
        }
    }
}
module.exports = {
    OrganizeKey : organizeFn
}