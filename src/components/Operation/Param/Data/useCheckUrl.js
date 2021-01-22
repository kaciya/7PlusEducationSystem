export const useCheckUrl = () => {
  // 判断是否是url
  const isURL = str_url => {
    const strRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return strRegex.test(str_url);
  };

  return {
    isURL
  };
};
