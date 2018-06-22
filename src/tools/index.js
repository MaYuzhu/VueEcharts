import ajax from './ajax'

export const reqData = () => ajax('api/zzcismp/tsd/getBuildDevsData.shtml?' +

  'buildcode=3506I0006&' +
  'starttime=2018-06-19+09%3A34%3A12&' +
  'endtime=2018-06-20+09%3A34%3A12&' +
  'timetype=minute')

//export const reqData = () => ajax('api/zzcismp/mntdesc/findTotalDescInfo.shtml?projcode=35060010&buildcode=3506I0008&devcode=3506I00080010F02')
