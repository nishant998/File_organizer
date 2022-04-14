let fs = require("fs") ;
let path = require("path") ;
function treeFn(dirPath){
    if(dirPath==undefined){
        TreeHelper(process.cwd()+"") ;
        console.log("kindly put the directory name ");
        return ;
    }else{
        TreeHelper(process.cwd()+"") ;
        return ;
    }
} 
function TreeHelper(dirPath , indent){
    let isFile = fs.lstatSync(dirPath).isFile() ;
    if(isFile == true){
        let fileName = path.basename(dirPath) ;
        console.log(indent + ""+fileName) ;
    }else{
        let dirName = path.basename(dirPath) ;
        console.log(indent+""+dirName) ;
        let childrens = fs.readdirSync(dirPath) ;
        for(var i = 0 ; i<childrens.length ; i++){
            let childPath = path.join(dirPath , childrens[i]) ;
            TreeHelper(childPath , indent+"\t") ; 
        }
    }
}
 
module.exports={
    TreeKey:treeFn
}