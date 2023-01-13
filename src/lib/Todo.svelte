<script>
    import { todo } from "../store";
    import Input from "./Input.svelte";

    let todoToDisplay;
    let sortBy = "PENDING";

    function handleTodoInput(e) {
        todo.setTodo(e.detail);
        todoToDisplay = todo.getTodo("PENDING");
    }

    function handleSort(e) {
        sortBy = e.detail.sortBy;
        todoToDisplay = todo.getTodo(e.detail.sortBy);
    }

    function handleComplete(id) {
        todo.completeTodo(id);
        todoToDisplay = todo.getTodo();
    }

    function handleDelete(id) {
        todo.deleteTodo(id);
        todoToDisplay = todo.getTodo();
    }
</script>

<div class="todo-view">
    <Input on:todoadded={handleTodoInput} on:sortchange={handleSort} />

    <div class="todo-list">
        {#if todoToDisplay}
            {#each todoToDisplay as t}
                <section class="todo-elem">
                    <h1>
                        {t.todo}
                    </h1>

                    {#if sortBy === "PENDING"}
                        <div class="buttons">
                            <button
                                class="complete"
                                on:click={() => handleComplete(t.id)}
                            >
                                Mark as Complete
                            </button>
                            <button
                                class="delete"
                                on:click={() => handleDelete(t.id)}
                            >
                                Delete
                            </button>
                        </div>
                    {/if}
                </section>
            {/each}
        {/if}
    </div>
</div>

<style>
    .todo-list {
        padding: 1rem;
        position: relative;
    }

    .todo-list p {
        text-align: center;
    }

    .todo-elem {
        margin: 1rem 0;
        border: 2px solid rgba(0, 0, 0, 0.3);
        padding: 0.5rem 1.5rem;
        border-radius: 1rem;
        background-color: var(--ks-background-yellow);
    }

    .todo-elem h1 {
        max-width: 900px;
    }

    .todo-elem .buttons {
        margin: 0.5rem 0;
    }

    .buttons button {
        padding: 0.5rem 1rem;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }

    .buttons button.complete {
        background-color: var(--ks-background-green);
    }

    .buttons button.delete {
        background-color: var(--ks-background-red);
    }

    .buttons button:active {
        border: 1px solid rgba(0, 0, 0);
    }
</style>
