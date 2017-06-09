<#include "/head.ftl">
<p>I'm ${name}.</p>
<button onclick="getVersion(this)">get Version</button>
<script>
function getVersion(btn) {
	fetch('/api/version').then(function(res) {
		return res.json()
	}).then(function(data) {
		btn.textContent = data.version
	}).catch(function(err) {
		alert(err)
	})
}
</script>
<#include "/foot.ftl">