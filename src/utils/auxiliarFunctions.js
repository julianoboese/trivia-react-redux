export const getCurrentDateNTime = () => {
  const id = Date.now();
  const momentData = new Date(id).toString().replace(/\(|\)/gm, '').split(' ');
  const momentObj = {
    id,
    day: momentData[2],
    month: momentData[1],
    year: momentData[3],
    time: momentData[4],
    timeZone: momentData[5],
    fullData: momentData,
  };
  return momentObj;
};

export const aaa = console.log('xablau');
