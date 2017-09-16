demand.define(function() {

    function routerEntered(path, from, el) {
        var _path = this.getHash(path);
        switch(_path) {
            case '/detail':
                this.search(el, this.search(path));
                break;
            default:
                ;
        }
    }

    function routerEnter(path) {
        var _path = this.getHash(path);
        switch(_path) {
            case '/detail':
                (function() {
                    var el = this.constructor.fn.getEl(this.routes['/detail']['viewWrap']);
                    if(el && 　this.routes['/detail'].tmpl) {
                        this.routes['/detail'].tmpl.getData(el);
                    }
                }).call(this);
                break;
            default:
                ;
        }
    }

    return {
        routerEnter: routerEnter,
        routerEntered: routerEntered
    };
});