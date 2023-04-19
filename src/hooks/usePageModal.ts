import { ref } from 'vue'
import type PageModal from '@/components/pageView/page-modal'

type CallBackType = (data?: any) => void

function usePageModal(newCallback?: CallBackType, editCallback?: CallBackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)

    // 通过回调函数把需要使用的数据传回到组件内部
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
