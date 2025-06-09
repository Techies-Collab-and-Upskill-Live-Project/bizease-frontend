"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { usePreference } from "@/hooks/usePreference";
import { Input } from "../ui/input";

export function PreferenceSettings() {
  const { form, onSubmit } = usePreference();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-6 md:px-24 lg:px-80 "
      >
        <div>
          <h3 className="mb-4 text-xs md:text-sm text-gray-400 font-semibold tracking-wide">
            Email Notifications
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="new_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm md:text-base">
                      Receive email notifications for new orders{" "}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="low_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm md:text-base">
                      Receive email notifications for low stocks{" "}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Notifcations */}
        <div>
          <h3 className="mb-4 text-xs md:text-sm text-gray-400 font-semibold tracking-wide">
            Notifications
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="new_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm md:text-base">
                      Receive Email notifications{" "}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="low_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm md:text-base">
                      Receive Message notifications{" "}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      className="0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Stock Threshold */}
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="alert_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xs md:text-sm text-gray-400 font-semibold tracking-wide">
                    Low Stock Alert Threshold(units)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="5 units"
                        className="pr-10 text-xs md:text-sm text-black p-6 md:p-8 font-medium tracking-wide "
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Save Changes */}
        <div className="flex justify-center w-full my-2">
          <Button
            type="submit"
            className="w-full rounded-sm py-5 md:py-7 cursor-pointer bg-[#06005B]"
            
          >
            Save Changes
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
}
