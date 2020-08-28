// app/models/note.js
import Model, { attr } from '@ember-data/model';

/**
 * 定义笔记model
 */
export default class NoteModel extends Model {
    // 笔记标题
    @attr('string', { defaultValue: ' 未定义标题' }) title;
    // 笔记内容
    @attr('string') content;
    // 笔记的tag，可以是多个
    @attr('string') tags;
    // 星标
    @attr('boolean', { defaultValue: false }) isStared;
    // 删除状态
    @attr('boolean', { defaultValue: false }) isDeleted;
    // 中间菜单选中
    @attr('boolean', { defaultValue: false }) isSelected;
    // 笔记创建时间，默认是当期创建的时间，为了方便处理保存为时间戳
    @attr('number', {
        defaultValue() {
            return new Date().getTime();
        }
    }) createdDate;

    // 展示的时间格式转为：xxx之前
    get noteCreatedTime() {
        let timestamp = `${this.createdDate}`;
        function zeroize( num ) {
            return (String(num).length == 1 ? '0' : '') + num;
        }

        var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
        var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

        var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
        var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

        var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
        var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

        if ( timestampDiff < 60 ) { // 一分钟以内
            return "刚刚";
        } else if( timestampDiff < 3600 ) { // 一小时前之内
            return Math.floor( timestampDiff / 60 ) + "分钟前";
        } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
            return '今天' + zeroize(H) + ':' + zeroize(i);
        } else {
            var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
            if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
                return '昨天' + zeroize(H) + ':' + zeroize(i);
            } else if ( curDate.getFullYear() == Y ) {
                return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
            } else {
                return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
            }
        }
    }
}
