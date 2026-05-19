<script setup>
const supabase = useSupabaseClient()
const redirectInfo = useSupabaseCookieRedirect()

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const path = redirectInfo.pluck()
    navigateTo(path || '/')
  }
})
</script>

<template>
  <div>Waiting for login...</div>
</template>