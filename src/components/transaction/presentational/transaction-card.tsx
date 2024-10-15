'use client';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import ActionButton from '@/components/common/action-button/button';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Card,CardDescription,CardTitle} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ITransactionRequest } from '@/lib/interfaces/get-office-transaction-interface';

interface TransactionCardProps {
  endorsement: ITransactionRequest;
}

export default function TransactionCard({ endorsement }: TransactionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedItems, setIsExpandedItems] = useState(false);
  const fullText = endorsement.user_defined_purpose || "N/A";
  const truncatedText = fullText.slice(0, 100);

  const { items, borrower, created_at, custom_transac_id } = endorsement;

  // Number of rows to show when collapsed
  const visibleRowsCount = 3;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full h-full flex flex-col cursor-pointer group"
    >
      <Card className="border-2 rounded-lg flex justify-between py-9 px-10 my-4">
      <Avatar>
        <AvatarFallback className="bg-primary-foreground text-primary-background">
          {borrower
            .split(' ') // Split the full name by spaces
            .slice(0, 2) // Take only the first two words (First and Last name)
            .map(name => name.charAt(0).toUpperCase()) // Get the first letter of each and capitalize it
            .join('') // Join the initials together
          }
        </AvatarFallback>
      </Avatar>


        <div className='w-2/5'>
          <div className='flex items-center space-x-2'>
            <CardTitle className="font-black uppercase text-lg">{borrower}</CardTitle>
            <CardDescription>{endorsement.apc_id}</CardDescription>
          </div>

          <div className='flex items-center space-x-2 my-2'>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              </path>
            </svg>
            <p className='text-muted-foreground'>Submitted  {" "}   
              {new Date(endorsement.created_at).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                  }) + " "}</p>
          </div>
          {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
            <div key={index}>
              <Badge variant="secondary">{item.quantity} item</Badge>
            </div>
          ))}

          <div className='flex items-center justify-stretch space-x-2 my-6'>
            <p className='text-muted-foreground'>Specific Purpose</p>
            <Badge variant='secondary'>
              {endorsement.purpose 
                ? endorsement.purpose
                    .toLowerCase() // Convert to lowercase
                    .replace(/_/g, ' ') // Replace underscores with spaces
                    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
                : "N/A"
              }
            </Badge>
          </div>

          <div className='text-balance'>
            <div className="overflow-hidden">
              <p>
                {isExpanded
                  ? fullText
                  : (
                    <>
                      {truncatedText}...
                      <span
                        onClick={() => setIsExpanded(true)}
                        className='text-blue-500 cursor-pointer ml-1'
                      >
                        See More
                      </span>
                    </>
                  )
                }
              </p>
            </div>

            {isExpanded && (
              <span
                onClick={() => setIsExpanded(false)}
                className='text-blue-500 cursor-pointer mt-2'
              >
                See Less
              </span>
            )}
          </div>
        </div>

        <div>
          <div className='flex justify-end p-4'>
            <ActionButton
              approveText="Approve"
              declineText="Decline"
              onApprove={() => console.log('Approve')}
              onDecline={() => console.log('Decline')}
            />
          </div>

          <div className='flex items-center space-x-2 my-2'>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              </path>
            </svg>
            
            <p className='text-muted-foreground max-w-lg'>
              {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
                <div key={index}>
                  Total Borrowing Period: 
                  {new Date(item.start_date).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                  }) + " "}
                  to 
                  {" "}
                  {new Date(item.due_date).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                  })}
                </div>
              ))}
            </p>
          </div> 

          <h1 className='my-6 text-lg text-muted-foreground'>Items</h1>

          <div className="my-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Name</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.slice(0, isExpandedItems ? items.length : visibleRowsCount).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.model_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {items.length > visibleRowsCount && (
              <div className="text-center mt-4">
                <Button
                  onClick={() => setIsExpandedItems(!isExpandedItems)}
                  variant="outline" 
                  className="text-blue-500"
                >
                  {isExpandedItems ? "Collapse" : "Expand"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
