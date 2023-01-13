<script>
    import Appreciation from "./lib/Appreciation.svelte";
    import Header from "./lib/Header.svelte";
    import Todo from "./lib/Todo.svelte";
</script>

<div class="app">
    <Header />
    <main>
        <Todo />
    </main>
    <Appreciation />
</div>

<style>
    main {
        max-width: 1556px;
        margin: 0 auto;
    }
</style>
