export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) =>{
        if(a.cases > b.cases){
            return -1;
        }else{
            return 0;
        }
    
    });
    return sortedData;
};