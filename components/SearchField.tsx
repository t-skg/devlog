'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '@/styles/SearchField.module.css'

export function SearchField() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [searchText, setSearchText] = useState(q || '')

  useEffect(() => {
    if (q) setSearchText(q)
  }, [q])

  return (
    <form className={styles.Search} action="/search">
      <input
        type="search"
        name="q"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder=""
        className={styles.SearchInput}
      />
      <button type="submit" className={styles.SearchButton} aria-label="検索">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}

// 🕓 Suspense fallback用の軽量アイコン表示
export function SearchFieldFallback() {
  return (
    <div className={styles.Search}>
      <button
        type="button"
        className={styles.SearchButton}
        aria-label="検索（読み込み中）"
        disabled
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  )
}

// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import styles from '@/styles/SearchField.module.css'

// export function SearchFieldFallback() {
//   return (
//     <div className={styles.Search}>
//       <button
//         type="button"
//         className={styles.Search_Button}
//         aria-label="search"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
//           <path
//             d="M9.3890873 1.6109127c1.81744 1.81743998 2.0970461 4.59036739.8388184 6.7018035l3.3116969 3.3126728c.3547755.3547755.3257954.9589604-.0647289 1.3494847-.3626297.3626297-.9094871.4135198-1.2698126.1348865l-.0796721-.0701576-3.22015474-3.21985629C6.7465078 11.5258295 3.60410194 11.3822765 1.6109127 9.3890873c-2.1478836-2.14788361-2.1478836-5.63029099 0-7.7781746 2.14788361-2.1478836 5.63029099-2.1478836 7.7781746 0zM2.95984943 2.95984943c-1.40288642 1.40288642-1.40288642 3.67741472 0 5.08030114 1.40288642 1.40288642 3.67741472 1.40288642 5.08030114 0 1.40288642-1.40288642 1.40288642-3.67741472 0-5.08030114-1.40288642-1.40288642-3.67741472-1.40288642-5.08030114 0z"
//             fill="#333"
//             fillRule="nonzero"
//           />
//         </svg>
//       </button>
//     </div>
//   )
// }

// export function SearchField() {
//   const searchParams = useSearchParams()
//   const q = searchParams.get('q')

//   const searchRef = useRef<HTMLInputElement>(null)
//   const [searchText, setSearchText] = useState(q || '')

//   const focus = useCallback(() => {
//     if (searchRef.current) {
//       searchRef.current.focus()
//     }
//   }, [searchRef])

//   useEffect(() => {
//     if (q) {
//       setSearchText(q)
//     }
//   }, [q])

//   return (
//     <div className={styles.Search}>
//       <button
//         type="button"
//         className={styles.Search_Button}
//         aria-label="search"
//         onClick={focus}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
//           <path
//             d="M9.3890873 1.6109127c1.81744 1.81743998 2.0970461 4.59036739.8388184 6.7018035l3.3116969 3.3126728c.3547755.3547755.3257954.9589604-.0647289 1.3494847-.3626297.3626297-.9094871.4135198-1.2698126.1348865l-.0796721-.0701576-3.22015474-3.21985629C6.7465078 11.5258295 3.60410194 11.3822765 1.6109127 9.3890873c-2.1478836-2.14788361-2.1478836-5.63029099 0-7.7781746 2.14788361-2.1478836 5.63029099-2.1478836 7.7781746 0zM2.95984943 2.95984943c-1.40288642 1.40288642-1.40288642 3.67741472 0 5.08030114 1.40288642 1.40288642 3.67741472 1.40288642 5.08030114 0 1.40288642-1.40288642 1.40288642-3.67741472 0-5.08030114-1.40288642-1.40288642-3.67741472-1.40288642-5.08030114 0z"
//             fill="#333"
//             fillRule="nonzero"
//           />
//         </svg>
//       </button>
//       <form action="/search">
//         <div className={styles.Search_Input}>
//           <input
//             ref={searchRef}
//             name="q"
//             type="search"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search"
//           />
//         </div>
//       </form>
//     </div>
//   )
// }
