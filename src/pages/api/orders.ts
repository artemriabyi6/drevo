import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderRequest {
  name: string
  phone: string
  email?: string
  address: string
  items: OrderItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, email, address, items } = req.body as OrderRequest
    const total = items.reduce((sum: number, item: OrderItem) => sum + item.price * item.quantity, 0)

    const prismaItems = items as unknown as Prisma.JsonArray

    const order = await prisma.order.create({
      data: {
        name,
        phone,
        email,
        address,
        items: prismaItems,
        total
      }
    })

    return res.status(201).json(order)
  } catch (error: unknown) {
    console.error('Error creating order:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    })
  }
}
