import { ref } from 'vue'
import type PageModal from '@/components/pageView/page-modal'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
