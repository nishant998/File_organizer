#!/usr/bin/env node
let fs = require("fs") ;
let path = require("path") ;
let helpObj = require("./commands/help") ;
let organizeObj = require("./commands/organize") ;
let TreeObj = require("./commands/tree") ;
const utility = {
    media : ["mp4" , "mkv"] ,
    archives : ['zip' , '7z' , 'rar' , 'tar' , 'gz' , 'ar' , 'iso' , 'xz'] ,
    documents : ['docx' , 'doc' , 'pdf' , 'xlsx' , 'xls' , 'odt' , 'ods', 'odp' , 'odg' , 'odf' , 'txt' , 'ps'],
    app : ['exe', 'dmg' , 'pkg' , 'deb']
}
let input_arr = process.argv.slice(2) ;
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help
let command = input_arr[0] ;
switch(command){
    case "tree":
        TreeObj.TreeKey(input_arr[1]) ;
        break ;
    case "organize":
        organizeObj.OrganizeKey(input_arr[1]) ;
        break ;
    case "help":
        helpObj.helpKey(input_arr[1]) ;
        break ;
    default :
        console.log("please input Right Command")
        break ;        
}
