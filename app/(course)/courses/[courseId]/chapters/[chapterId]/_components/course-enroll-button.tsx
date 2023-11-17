"use client"
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface CourseEnrollButtonProps {
    price: number,
    courseId: string
}

export const CourseEnrollButton = ({
  price,
  courseId
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async() => {
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url)
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mx-12'>
      <Button 
        onClick={onClick}
        disabled={isLoading}
        size='sm' 
        className='w-[27rem] md:w-auto'>
        Enroll ({formatPrice(price)})
      </Button>
    </div>
  )
}