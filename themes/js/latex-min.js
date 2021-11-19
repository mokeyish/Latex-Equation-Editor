var editor = ace.edit("code"),
    $result = $("#east");
editor.setTheme("ace/theme/crimson_editor");
editor.getSession().setMode("ace/mode/tex");
editor.getSession().setUseWrapMode(!0);
editor.focus();
$("#code").resize(function() {
    editor.resize(!0);
    editor.focus()
});
$("#codebox").tabs({
    onSelect: function(a, b) {
        editor.resize(!0);
        editor.focus()
    }
});
$("#clear").click(function() {
    editor.getValue().length && $.messager.confirm("Alert", "Do you really want to remove the code?", function(a) {
        a && (a = document.querySelector(".ace_editor").env.editor, a.selection.getCursor(), a.setValue(""), $result.html(""))
    }).window({
        width: 400
    })
});
var edit = document.querySelector(".ace_editor").env.editor,
    latex;
$(".keyboard li").click(function() {
    $(this);
    var a = $(this).html(),
        b = a.match(/(.*)MathJax-Element-(\d+)(.*)/);
    b ? latex = $("#MathJax-Element-" + b[2]).html() : a.match(/Space/) ? latex = "\\:" : a.match(/Quad/) ? latex = "\\quad" : a.match(/Enter/) && (latex = "\\\\");
    edit.selection.getCursor();
    edit.insert(latex)
});
editor.on("change", function() {
    var a = editor.getValue();
    0 >= a.length && ($result.html(""), result);
    $result.html("$" + a + "$");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "east"])
});
$("#undo").click(function() {
    editor.getSession().getUndoManager().hasUndo() && editor.getSession().getUndoManager().undo(!1)
});
$("#redo").click(function() {
    editor.getSession().getUndoManager().hasRedo() && editor.getSession().getUndoManager().redo(!1)
});
var clipboard;
$("#cut").click(function() {
    var a = editor.getSelectionRange();
    editor.getSession().getTextRange(a) && (clipboard = editor.getSession().getTextRange(a), editor.getSession().remove(a))
});
$("#delete").click(function() {
    var a = editor.getSelectionRange();
    editor.getSession().getTextRange(a) && editor.getSession().remove(a)
});
$("#copy").click(function() {
    var a = editor.getSelectionRange();
    editor.getSession().getTextRange(a) && (clipboard = editor.getSession().getTextRange(a))
});
$("#paste").click(function() {
    var a = editor.getCursorPosition();
    editor.getSession().insert(a, clipboard)
});
$("#select").click(function() {
    editor.getSelection().selectAll()
});
$("#find").click(function() {
    editor.execCommand("find")
});
$("#findreplace").click(function() {
    editor.execCommand("replace")
});

function setEditorTheme(a) {
    editor.setTheme("ace/theme/" + a)
}

function setEditorSoftWrap(a) {
    "true" === a ? editor.getSession().setUseWrapMode(!0) : "false" === a ? editor.getSession().setUseWrapMode(!1) : (editor.getSession().setUseWrapMode(!0), editor.getSession().setWrapLimitRange(parseInt(a), parseInt(a)))
}

function setEditorFontSize(a) {
    editor_font_size = parseInt(a);
    editor.setFontSize(editor_font_size);
    $("#east").css("font-size", editor_font_size)
}

function download(a) {
    var b = editor.getValue();
    if (0 >= b.length) return $.messager.alert("Alert", "Please type some code to generate image"), !1;
    $.ajax({
        url: "https://tools.tutorialspoint.com/process_latex.php",
        method: "POST",
        data: {
            type: a,
            code: b
        },
        dataType: "json",
        beforeSend: function() {
            $("#loading").css({
                visibility: "visible"
            })
        },
        success: function(a) {
            $("#loading").css({
                visibility: "hidden"
            });
            $("#download").attr("src", a.file)
        },
        error: function(a) {
            $("#loading").css({
                visibility: "hidden"
            });
            $("#download").attr("src", a.file)
        }
    })
}

function setEditorTabSize(a) {
    editor_tab_size = parseInt(a);
    editor.getSession().setTabSize(editor_tab_size)
}

function setEditorInvisible(a) {
    editor.setShowInvisibles(a)
}

function setEditorGutter(a) {
    editor.renderer.setShowGutter(a)
}
$("div#loading").css({
    visibility: "hidden"
});
$("form#ff").css({
    visibility: "visible"
});