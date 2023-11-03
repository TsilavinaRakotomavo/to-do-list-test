<script setup lang="ts">
import { computed, ref } from 'vue';
import task from "./components/Task.vue";
import type { TaskInterface } from './interfaces/task.interface';

const taskInput = ref<string>('');
const taskId = ref<number>(1);
const selectedTask = ref<TaskInterface | null>(null);
const selectedTaskName = computed({
  get: () => selectedTask.value ? selectedTask.value.name : '',
  set: (newValue) => {
    if (selectedTask.value) {
      selectedTask.value.name = newValue;
    }
  }
});
const tasks = ref<TaskInterface[]>([
  {
    id: String(taskId.value++),
    name: "Hello",
    completed: false,
  },
  {
    id: String(taskId.value++),
    name: "World",
    completed: false,
  },
]);

const editTask = (taskId: string) => {
  const taskToEdit = tasks.value.find((task) => task.id === taskId);
  if (taskToEdit) {
    selectedTask.value = { ...taskToEdit };
  }
};

const saveEditedTask = () => {
  const taskIndex = tasks.value.findIndex((task) => task.id === selectedTask.value?.id);
  if (taskIndex !== -1) {
    tasks.value[taskIndex] = { ...selectedTask.value } as TaskInterface;
    selectedTask.value = null;
  }
}

const deleteTask = (taskId: string) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.value.splice(taskIndex, 1);
  }
};

const addTask = () => {
  if (taskInput.value.trim() !== '') {
    const newTask: TaskInterface = {
      id: String(taskId.value++),
      name: taskInput.value,
      completed: false,
    };
    tasks.value.push(newTask);
    taskInput.value = '';
  }
};

const incompleteTaskCount = computed(() => tasks.value.filter((task) => !task.completed).length);
</script>

<template>
  <div class="position-absolute top-50 start-50 translate-middle w-50">
    <div class="card text-bg-light p-2">
      <div class="card-body">
        <h3 class="card-title pb-3 m-0 text-center">
          <u>To Do List</u>
        </h3>
        <h6 class="float-end mb-3" style="color: #F93943;">Not completed tasks: {{ incompleteTaskCount }}</h6>
        <form @submit.prevent="addTask">
          <div class="input-group mb-3">
            <input v-model="taskInput" type="text" class="form-control" placeholder="Enter a new task"
              aria-label="New task" aria-describedby="button-addon2" id="inputTask">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2"><i
                class="bi bi-plus-lg"></i></button>
          </div>
        </form>
        <task v-for="task in tasks" :key="task.id" :task="task" :editAction="editTask" :deleteAction="deleteTask" />
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editModalLabel">Edit Task</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
          <input v-model="selectedTaskName" type="text" class="form-control my-3 mx-auto w-75" id="editTaskName">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="saveEditedTask" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save
            changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #7EB2DD;
}
</style>