/*
 *  检测是否在浏览器的环境中 
 * */

const inBrowser = typeof window !== 'undefined';

export default inBrowser;
