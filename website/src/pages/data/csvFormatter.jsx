import * as pd from "danfojs";
import json2csv from 'json2csv';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const parseJson = (data,features,start_time,end_time) => {
    features = features.map((feat) => feat.value)
    console.log(data["items"][0]["recorded_features"][0]["data"])
    var diff =(new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000;
    diff /= 60;
    var per = Math.round(diff/5);
    let times = new pd.dateRange({start:start_time,offset:5,period:per,freq:"m"})
    const cols = ['Timestamp'].concat(features)
    // var myArray = [];
    // myArray.push([]);
    // myArray[0] = times;
    // for (let i=0;i<features.length;i++){
    //     myArray[i+1] = times;
    // }
    // myArray = myArray[0].map((_, colIndex) => myArray.map(row => row[colIndex]));
    // let df = new pd.DataFrame(myArray,{columns:cols})
    // console.log(myArray)
    // let df_n = df.column('Timestamp') = times
    // df.addColumn("Timeamp", times, { inplace: true });
    console.log(times)
    var obj = {}
    for(let curr in times){
        const dateObj = new Date(times[curr]);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const seconds = dateObj.getSeconds().toString().padStart(2, '0');

        const dateStringFormatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        // var acc = {};
        // acc["Timestamp"] = dateStringFormatted
        obj[dateStringFormatted] = {}
        features.forEach((element) => {
            obj[dateStringFormatted][element] = ""
        })
    }
    // const obj = times.reduce((acc, curr) => {
    //     const dateObj = new Date(curr);
    //     const year = dateObj.getFullYear();
    //     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    //     const day = dateObj.getDate().toString().padStart(2, '0');
    //     const hours = dateObj.getHours().toString().padStart(2, '0');
    //     const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    //     const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    //     const dateStringFormatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //     acc = {};
    //     acc["Timestamp"] = dateStringFormatted
    //     features.forEach((element) => {
    //         acc[element] = ""
    //     })
    //     return acc;
    //   }, {});
    // console.log(obj)
    const zip = new JSZip();
    for(let room in data["items"]){
        var room_json = obj;
        var room_data = data["items"][room]["recorded_features"]
        for(let feat in room_data){
            var feature_data = room_data[feat]["data"]
            var col_name = room_data[feat]["feature"]
            for(let rec in feature_data){
                var time = feature_data[rec]["time"];
                room_json[time][col_name] = feature_data[rec]["value"]
            }
        }
        var conv = Object.keys(room_json).map(function(timestamp) {
            var data = room_json[timestamp];
            var ret = {};
            ret["Timestap"] = timestamp;
            features.forEach((element) => {
                ret[element] = data[element]
            })
            return ret
        });
      const csv = json2csv.parse(conv);
      const filename = `${data["items"][room]["room_id"]}.csv`;
      zip.file(filename, csv);
    }
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        FileSaver.saveAs(blob, 'output.zip');
      });
};

export default parseJson;