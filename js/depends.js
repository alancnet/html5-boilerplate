function depends(relMap, callback) {
    var marker = {};
    depends.stack.push(marker);
    depends.checks.push(function() {
        if (depends.stack.slice(-1)[0] == marker && marker.done){
            depends.stack.pop();
            callback.apply(marker.t, marker.args);
            return true;
        }
        return false;
    });
    requirejs(relMap, function() {
        marker.done = true;
        marker.args = [];
        for (var i = 0; i < arguments.length; i++) {
            marker.args.push(i);
        }
        marker.t = this;
        depends.checkCallbacks();
    });
}
depends.stack = [];
depends.checks = [];
depends.checkCallbacks = function() {
    for (var i = 0; i < depends.checks.length; i++) {
        var check = depends.checks[i];
        if (check()) {
            depends.checks.splice(i, 1);
            depends.checkCallbacks();
            break;
        }
    }
};
