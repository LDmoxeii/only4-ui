<!-- CountdownDialog.vue -->
<!-- 倒计时确认对话框组件 -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    //是否显示弹窗
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '确认操作'
  },
  countdownDuration: {
    //倒计时时间
    type: Number,
    default: 3
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const internalCountdown = ref(props.countdownDuration)
const disableConfirm = ref(true)
let timer = null

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      startCountdown()
    } else {
      resetCountdown()
    }
  }
)

function startCountdown() {
  resetCountdown()
  disableConfirm.value = true
  internalCountdown.value = props.countdownDuration

  timer = setInterval(() => {
    internalCountdown.value -= 1
    if (internalCountdown.value <= 0) {
      clearInterval(timer)
      disableConfirm.value = false
    }
  }, 1000)
}

function resetCountdown() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  internalCountdown.value = props.countdownDuration
  disableConfirm.value = true
}

function handleConfirm() {
  if (!disableConfirm.value && !props.confirmDisabled) {
    emit('confirm')
    closeDialog()
  }
}

function handleCancel() {
  emit('cancel')
  closeDialog()
}

function closeDialog() {
  emit('update:modelValue', false)
}
</script>

<template >
  <el-dialog
    :model-value="modelValue"
    :title="title"
    width="30%"
    center
    @closed="handleCancel"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
        <el-button
          type="danger"
          :disabled="disableConfirm || confirmDisabled"
          @click="handleConfirm"
        >
          {{ confirmText }}
          <template v-if="disableConfirm">
            ({{ internalCountdown }}s)
          </template>
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>