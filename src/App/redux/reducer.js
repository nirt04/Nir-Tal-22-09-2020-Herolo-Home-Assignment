export const appConfigReducer = (
  state = {
    // apiKeys: [
    //   'CNaQZfKNEpgWU5zO2MM3GAUv6QkoeeGh',
    //   'nHz7ILclGvWOyqQQA7y3kASkAan1oQ34',
    //   'A93ZHWxuSpGJ3A4OlGiTs7dWWgLLDRKD',
    //   'xFGvCy1FaaIkGtmG3Y3fLsuTE1lpdUVX',
    //   'JpXZNXKBXpKo5VVG0RZzybpKahdMX8vv',
    //   'xFGvCy1FaaIkGtmG3Y3fLsuTE1lpdUVX',
    //   'rahPnD6qt8hT5e5c1tyfpo5SG51pefEB',
    //   'nHz7ILclGvWOyqQQA7y3kASkAan1oQ34',
    //   'yorJNfSt5GWC6ym3UEo8WZGX0N5eyRhb',
    // ],
    // CurrentApiKeyIndex: 0,
    themeType: 'dark',
    tempratureUnit: 'Metric',
    isAppReady: false,
  },
  action,
) => {
  switch (action.type) {
    case 'UPDATE_APP_CONFIG':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
