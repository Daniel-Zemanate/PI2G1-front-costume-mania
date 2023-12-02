import { Invoice } from '@/interfaces/invoice'
import React from 'react'

type Props = {
  invoices: Invoice[]
}

function AdminInvoices({invoices}: Props) {
  console.log(invoices)
  return (
    <div>AdminInvoices</div>
  )
}

export default AdminInvoices