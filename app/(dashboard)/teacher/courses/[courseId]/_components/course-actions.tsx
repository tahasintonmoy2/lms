"use client"
import { ConfirmModal } from '@/components/models/confirm-modal'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import { getError } from '@/lib/get-error-message'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface CourseActionsProps {
  disabled: boolean,
  isPublished:boolean,
  courseId: string,
}

export const CourseActions = ({
  disabled,
  isPublished,
  courseId,
}: CourseActionsProps) => {
  const router = useRouter()
  const confetti = useConfettiStore();
  const [isLoadig, setIsLoading] = useState(false);

  const onPublish =async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh()
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete =async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Course has deleted!");
      router.push(`/teacher/courses`)
      router.refresh()
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onPublish}
        disabled={disabled || isLoadig}
        variant='outline'
        size='sm'
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          disabled={isLoadig}
          variant='destructive'
          size='sm'
        >
          <Trash className='h-4 w-4'/>
        </Button>
       </ConfirmModal>
    </div>
  )
}