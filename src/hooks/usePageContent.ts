import { ref } from 'vue'
import type PageContent from '@/components/pageView/page-content'

function usePageContent() {
  // 点击搜索 content操作
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchUserListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchUserListData()
  }
  return { contentRef, handleQueryClick, handleResetClick }
}

export default usePageContent
