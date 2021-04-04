var $dlgSearch=(function(){
  var html=`
    <div id="notepad-dlg-search">
      <div class="dialogbox notepad-dlgbox">
        <div class="notepad-dlg-titlebar">
          <p class="title">查找</p>
          <span class="close-btn">×</span>
        </div>
        <div class="main notepad-dlg-main">
          <label for="">查找内容(N):</label>
          <input class="txt-content" type="text" autofocus><br>
          <div class="box"> 
            <input name="check" type="checkbox" value="capital-sense">区分大小写(C)<br>
            <input name="check1"  type="checkbox" value="cycle">循环(R)
          </div>
          <fieldset class="search-direction">
            <legend>方向</legend>
            <input type="radio" name="direction"  value="up">向上(U)
            <input type="radio" name="direction" value="down" checked>向下(D)
          </fieldset>
          <input class="btn-search btn" type="button" value="查找下一个(F)">
          <input class="btn-cancel btn" type="button" value="取消">
        </div>
      </div>
    </div> `
  let $dlg=$(html),
      $btnClose=$dlg.find('.close-btn'),
      $btnCancel=$dlg.find(".btn-cancel"),
      $btnSearch=$dlg.find(".btn-search"),
      $txtContent=$dlg.find(".txt-content"),
      $titleBar=$dlg.find(".notepad-dlg-titlebar");

  function destory() { $dlg.remove(); }

  function verify() {
    if($txtContent.val() !== '') {
      $btnSearch.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
    }
  }
  
  function init() {
    $dlg.find('input[value="up"]').removeAttr('checked');
    $dlg.find('input[value="down"]')[0].checked = true;
    $dlg.find('input[type="checkbox"]').removeAttr('checked');
    $btnSearch.attr('disabled', 'disabled');
    $txtContent.val('');
    $txtContent.focus();
  }

  function show(searchHandler) {
    $('body').append($dlg);
    init();
    $btnClose.click(destory);
    $btnCancel.click(destory);
    $txtContent.keyup(verify);
    $btnSearch.click(function() {
      searchHandler({
        content: $txtContent.val(),
        capitalSense: $dlg.find('input[name="check"]:checked').val() === 'capital-sense',
        direction: $dlg.find('input[name="direction"]:checked').val(),
        cycle:$dlg.find('input[name="check1"]:checked').val()==='cycle'
      });
    });
  }
  
  return {show}

})();
