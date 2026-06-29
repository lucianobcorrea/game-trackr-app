export function useFileInput() {
    const handleFileChange = (
        e: Event,
        callback: (file: File | null) => void,
        nameCallback?: (name: string) => void
    ) => {
        const target = e.target as HTMLInputElement
        const file = target.files?.[0] ?? null

        if (file) {
            nameCallback?.(file.name)
            callback(file)
        } else {
            nameCallback?.('')
            callback(null)
        }
    }

    return { handleFileChange }
}