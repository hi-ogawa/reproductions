import { createApp, defineComponent, ref } from "vue";

const Root = defineComponent(() => {
	const count = ref(0);
	return () => (
		<div>
			<button onClick={() => count.value++}>Count {count.value}</button>
		</div>
	);
});

function main() {
	const app = createApp(Root);
	app.mount("#root");
}

main();
