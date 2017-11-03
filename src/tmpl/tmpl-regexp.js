const FILTER_TRANFORM = /[\b\t\f\n\r\v]/g, //过滤转义字符
    //script输出节点信息
    FILTER_SCRIPT = /[\b\f\r\v]/g,    
    //script的表达是
    SCRIPT_TAG = /<script.*?>([\s\S]*?)<\/script>/g,
    //转义双引号
    QUEST = /"/g,
    //引入模板
    INCLUDE_ID = /<tmpl-include .*?name=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-include>/g,
    //引入模板
    INCLUDE_FILE = /<tmpl-include .*?file=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-include>/g,
    //错误的模板
    INCLUDE_ERROR = /<tmpl-include.*?>([\s\S]*?)<\/tmpl-include>/g,
    //嵌入block块
    BLOCK = /<tmpl-block .*?name=(\'|\")([\s\S]*?)\1.*?>([\s\S]*?)<\/tmpl-block>/g,
    //append_block
    BLOCK_APPEND = /^append:/,
    //inser_block
    BLOCK_INSETR = /^insert:/,
    //base路径解析
    EXTEND = /<tmpl-extend .*?file=(\'|\")([\s\S]*?)\1.*?\/>/g;

export {
    FILTER_TRANFORM,
    FILTER_SCRIPT,
    SCRIPT_TAG,
    QUEST,
    INCLUDE_ID,
    INCLUDE_FILE,
    INCLUDE_ERROR,
    BLOCK,
    BLOCK_APPEND,
    BLOCK_INSETR,
    EXTEND
}