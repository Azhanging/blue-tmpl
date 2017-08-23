const FILTER_TRANFORM = /[\b\t\r\f\n]/g, //过滤转义字符
    //转义双引号
    QUEST = /"/g,
    //引入模板
    INCLUDE_ID = /<tmpl-include .*?name=(\'|\")(\S*?)\1.*?>(.*?)<\/tmpl-include>/g,
    //引入模板
    INCLUDE_FILE = /<tmpl-include .*?file=(\'|\")(\S*?)\1.*?>(.*?)<\/tmpl-include>/g,
    //空模板
    INCLUDE_NULL = /<tmpl-include\s*?>(.*?)<\/tmpl-include>/g,
    //错误的模板
    INCLUDE_ERROR = /<tmpl-include(.*?)>(.*?)<\/tmpl-include>/g,
    //嵌入block块
    BLOCK = /<tmpl-block .*?name=(\'|\")(\S*?)\1.*?>([\s\S]*?)<\/tmpl-block>/g,
    //append_block
    BLOCK_APPEND = /^append:/,
    //inser_block
    BLOCK_INSETR = /^insert:/,
    //base路径解析
    EXTENDS = /<tmpl-extend .*?file=(\'|\")(\S*?)\1.*?\/>/g;

export {
    FILTER_TRANFORM,
    QUEST,
    INCLUDE_ID,
    INCLUDE_FILE,
    INCLUDE_NULL,
    INCLUDE_ERROR,
    BLOCK,
    BLOCK_APPEND,
    BLOCK_INSETR,
    EXTENDS
}
