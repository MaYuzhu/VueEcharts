import ajax from './ajax'

/*export const reqData = () => ajax('api/zzcismp/tsd/getBuildDevsData.shtml?' +

  'buildcode=3506I0006&' +
  'starttime=2018-06-19+09%3A34%3A12&' +
  'endtime=2018-06-20+09%3A34%3A12&' +
  'timetype=minute')*/


export const reqData =
  ({buildcode,starttime,endtime,timetype}) => ajax('api/zzcismp/tsd/getBuildDevsData.shtml',
                                            {buildcode,starttime,endtime,timetype})

  // 'buildcode=3506I0006&' +
  // 'starttime=2018-06-19+09%3A34%3A12&' +
  // 'endtime=2018-06-20+09%3A34%3A12&' +
  // 'timetype=minute'
