$(function() {
    var $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        $searchForm = $('.J_search_form');
    /**
     * 删除品牌
     * @param  {[type]}   ids      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    del = function(ids, callback) {
        if (!ids) {
            notify.warn('未选择任何项');
            return;
        }
        $('.J_confirm').modal({
            onConfirm: function(options) {
                $.post('', {
                    ids: ids
                }).then(function(res) {
                    if (res.code == 200) {
                        notify.warn('删除成功');
                        callback && callback();
                    } else {
                        notify.warn(res.message);
                    }
                });
            },
            onCancel: function() {}
        });
    };
    $('.J_geo').geo({
        checked: function(a, b) {
            $searchForm.submit();
        }
    });
    /**
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        del(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 批量删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_multi-del').on('click', function() {
        var ids = [];
        $singleCheckbox.each(function() {
            this.checked && ids.push($(this).closest('tr').attr('data-id'));
        });
        del(ids.join(','), function() {
            location.href = location.href;
        });
    });
    $('.J_select').on('change', function() {
        $searchForm.submit();
    });
    /**
     * 详情,审核通过data-href到不同页面
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_detail,.J_archive').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
});
