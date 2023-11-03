<script setup lang="ts">

const { task, editAction, deleteAction } = defineProps(['task', 'editAction', 'deleteAction']);

const editTask = () => {
    editAction(task.id);
}

const deleteTask = () => {
    deleteAction(task.id);
}
</script>


<template>
    <div class="list-group-item d-flex justify-content-between align-items-center mb-3">
        <div>
            <input class="form-check-input me-2" type="checkbox" v-model="task.completed">
            <label class="form-check-label" @click="editTask" data-bs-toggle="modal" data-bs-target="#editModal">{{
                task.name }}</label>
        </div>
        <div class="btn-group" role="group" aria-label="Task Actions">
            <i class="bi bi-pencil-square pe-3" @click="editTask" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <i class="bi bi-trash3-fill" @click="deleteTask"></i>
        </div>
    </div>
</template>
