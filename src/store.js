import { writable } from "svelte/store";

/**
 * `screenWriteable`
 *  A function for custom writeable, which includes almost all of the operations requires in the app related to the `screen` writeable.
 *  It is to track the screen dimensions , so to apply style changes as per need.
 */
function screenWriteable() {
    let mobileDimension = {
        min: 200,
        max: 500
    }

    let current;

    const { set, subscribe } = writable()

    subscribe( (val) => {
        current = val
    })

    /**
     * Used to set the screen dimensions.
     * 
     * @param {Number} x Screen's or Window's inner width.
     * @param {Number} y Screen's or Window's inner height.
     */
    const setScreen = (x, y) => {
        set({
            width: x,
            height: y
        })
    }

    /**
     * A function to keep track of the screen width w.r.t the min and max dimension of mobile screen.
     *   
     * @returns {Boolean} True if matches the condition and False for not.
     */
    const isMobile = () => {
        return mobileDimension.min <= current.width && current.width <= mobileDimension.max 
    }

    return { setScreen, isMobile }
}

/**
 * `todoWriteable`
 *  A function for custom writeable, which includes almost all of the operations requires in the app related to the `todo` writeable.
 * 
 * @returns {object} helpers A object containing all the operations.
 */
function todoWriteable() {
    const { subscribe, set, update } = writable()

    let todo;

    subscribe(value => todo = value)

    /**
     * A function to mark a todo complete.
     * 
     * @param {Number} id ID of the todo element. Must be Valid.
     */
    const completeTodo = (id) => {
        let newData = todo.map((val) => {
            if (val.id === id) {
                return { ...val, complete: true, pending: false, deleted: false }
            }

            return val
        })

        set(newData)
    }

    /**
     * A function to mark a todo delete
     * 
     * @param {Number} id ID of the todo element. Must be Valid.
     */
    const deleteTodo = (id) => {

        let newData = todo.map((val) => {
            if (val.id === id) {
                return { ...val, deleted: true, pending: false, complete: false }
            }

            return val
        })

        set(newData)
    }

    /**
     * A function to add new todo element into the `todo` writeable. 
     * 
     * @param {Object} Todo  Info about the todo element.
     * @param {Number} Todo.id ID of the todo element.
     * @param {String} Todo.todo Title or text for the Todo element.
     */
    const setTodo = ({ id, todo }) => {
        update(prevTodo => prevTodo ? [...prevTodo, { id: id, todo: todo, pending: true, complete: false, deleted: false }] : [{ id: id, todo: todo, pending: true, complete: false, deleted: false }])
    }

    const getTodo = (sort = 'PENDING') => {
        let todoToReturn;
        switch (sort) {
            case 'PENDING':
                todoToReturn = todo.filter(t => t.pending === true)
                return todoToReturn

            case 'COMPLETE':
                todoToReturn = todo.filter( t => t.complete === true)
                return todoToReturn

            case 'DELETE':
                todoToReturn = todo.filter(t => t.deleted === true)
                return todoToReturn
        }
    }

    return { setTodo, completeTodo, deleteTodo, getTodo }
}

export const screen = screenWriteable()
export const todo = todoWriteable()
